import type { ScoreType } from './questions';

export function calculateDimensionPercentages(scores: ScoreType): Record<string, number> {
  const total = scores.beauty + scores.ootd + scores.news + scores.cute + scores.food + scores.tech + scores.funny + scores.travel;
  if (total === 0) return { beauty: 50, ootd: 50, news: 50, cute: 50, food: 50, tech: 50, funny: 50, travel: 50 };
  const raw = {
    beauty: (scores.beauty / total) * 100,
    ootd: (scores.ootd / total) * 100,
    news: (scores.news / total) * 100,
    cute: (scores.cute / total) * 100,
    food: (scores.food / total) * 100,
    tech: (scores.tech / total) * 100,
    funny: (scores.funny / total) * 100,
    travel: (scores.travel / total) * 100,
  };
  const rounded = {
    beauty: Math.round(raw.beauty),
    ootd: Math.round(raw.ootd),
    news: Math.round(raw.news),
    cute: Math.round(raw.cute),
    food: Math.round(raw.food),
    tech: Math.round(raw.tech),
    funny: Math.round(raw.funny),
    travel: Math.round(raw.travel),
  };
  const sum = Object.values(rounded).reduce((a, b) => a + b, 0);
  if (sum === 100) return rounded;
  // Find the largest decimal remainder and adjust to make sum = 100
  const keys = Object.keys(rounded) as (keyof typeof raw)[];
  const remainders = keys.map(k => ({ k, r: raw[k] - rounded[k] }));
  remainders.sort((a, b) => b.r - a.r);
  const diff = 100 - sum;
  for (let i = 0; i < Math.abs(diff); i++) {
    const sign = diff > 0 ? 1 : -1;
    rounded[remainders[i].k] += sign;
  }
  return rounded;
}

export function getTitleForCategory(category: string, pct: number): string {
  const titles: Record<string, string[]> = {
    beauty: ['柳下惠', '正经人', '有点东西', '色狼', '色魔', '鉴屎官'],
    ootd: ['时尚绝缘体', '偶尔看看', '潮流达人', '穿搭博主', '时尚教母'],
    news: ['两耳不闻窗外事', '轻度关注', '时事达人', '键政侠', '战鹰'],
    cute: ['冷血动物', '云吸用户', '轻度铲屎官', '重度铲屎官', '动物园园长'],
    food: ['辟谷仙人', '偶尔馋了', '干饭人', '美食家', '探店狂魔'],
    tech: ['科技小白', '轻度关注', '数码达人', '科技博主', '赛博朋克'],
    funny: ['严肃星人', '偶尔笑笑', '乐子人', '搞笑博主', '快乐源泉'],
    travel: ['宅神', '周边玩家', '旅行达人', '旅游博主', '环游世界'],
  };
  const list = titles[category] || ['路人'];
  if (pct < 15) return list[0];
  if (pct < 30) return list[1];
  if (pct < 50) return list[2];
  if (pct < 70) return list[3];
  return list[4];
}

interface OverallType {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  personality: string[];
  strengths: string[];
  blindspots: string[];
  contentPreferences: string[];
  socialStyle: string;
  idealContent: string;
  topApps: string;
}

export function getOverallType(percentages: Record<string, number>): OverallType {
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 2).map(([k]) => k);
  const key = top.join(',');
  const keyRev = `${top[1]},${top[0]}`;

  const allTypes: Record<string, OverallType> = {
    'beauty,cute': {
      name: '好色吸猫党', emoji: '🥰', tagline: '你活成了互联网最矛盾的存在',
      description: '嘴上喊着看美女，手里刷着猫猫视频。你对视觉享受和情感陪伴的双重追求，让你成为了最分裂也最真实的快乐星球原住民。',
      personality: ['表面看脸，内心渴望被需要', '共情能力强，容易被萌宠治愈', '对美好事物有强烈向往，但行动上偏懒', '娱乐导向，刷手机是为了逃避孤独感'],
      strengths: ['发现美的眼光极其敏锐', '审美天赋高，对色彩和构图有直觉', '情感细腻，能感知他人情绪变化'],
      blindspots: ['容易停留在浅层愉悦，缺乏深度思考', '对丑/粗糙的事物耐心不足', '可能过度依赖外在刺激来获得满足感'],
      contentPreferences: ['高颜值博主vlog', '萌宠合集/猫猫狗狗日常', 'ASMR助眠/视觉系美食', '韩式氧气感穿搭'],
      socialStyle: '喜欢在朋友圈分享「戳中审美」的内容，不爱发长文字，一个图/视频说明一切。',
      idealContent: '光线柔和、构图精致的5分钟以内短视频，有萌宠或美人出镜。',
      topApps: '小红书 > 微博 > Instagram',
    },
    'beauty,ootd': {
      name: '颜值穿搭党', emoji: '💃', tagline: '你的眼睛和衣柜永远在同步',
      description: '好看的人+好看的衣服=你的完美世界。你对「美」的定义延伸到了生活的每一个细节——不只是脸，是整体氛围。',
      personality: ['自我要求高，对形象管理有执念', '有主见，不随波逐流', '社交场合倾向于「精致亮相」', '对粗糙/邋遢有强烈的排斥感'],
      strengths: ['审美嗅觉极其灵敏，能快速捕捉潮流变化', '穿搭和形象管理能力强', '对细节敏感，容易发现不和谐之处'],
      blindspots: ['可能过度在意他人眼光', '对「不够美」的人或事物缺乏耐心', '容易陷入外貌焦虑'],
      contentPreferences: ['穿搭博主ootd', '街拍/时尚周', '美妆教程/妆容分析', '奢侈品新品/设计趋势'],
      socialStyle: '精心策划朋友圈，每一张图都是作品。社交媒体是你的形象展厅。',
      idealContent: '有质感、有风格、有氛围感的图文或短视频。拒绝土味和低劣审美。',
      topApps: '小红书 > Instagram > 微博',
    },
    'beauty,news': {
      name: '正义好色人', emoji: '🛡️', tagline: '国家大事和神仙颜值，你都放不下',
      description: '你既能忧国忧民，又能欣赏世间美好。你是互联网最「正」的好色之徒——有社会责任感的高级视觉动物。',
      personality: ['有社会责任感，但不失生活情趣', '信息获取全面，不满足于表面新闻', '看待事物有多角度思维', '内心有正义感，但表达克制'],
      strengths: ['视野广，兼具深度和广度', '能理性分析时事，也能欣赏艺术美感', '不容易被单一信息源操控'],
      blindspots: ['信息过载可能导致焦虑', '对负面新闻的承受能力有极限', '容易陷入「知道分子」的陷阱'],
      contentPreferences: ['深度报道/调查新闻', '国际局势分析', '高颜值知识类博主', '纪录片/人物特稿'],
      socialStyle: '偶尔转发时事，附上简短评论。朋友圈偶有深度内容，但不是话痨。',
      idealContent: '有观点、有深度、有信息量的内容，最好赏心悦目。',
      topApps: '微博 > 知乎 > 微信公众号',
    },
    'beauty,food': {
      name: '美食好色客', emoji: '🍜', tagline: '你的人生哲学：秀色可餐',
      description: '「秀色可餐」在你这里不是比喻，是字面意思。你的人生两大支柱：吃好吃的，看好看的。少了任何一个，你都觉得人生不完整。',
      personality: ['对生活品质有追求，但不是矫情的那种', '务实与享受并存', '朋友圈相册里食物照片占50%以上', '愿意为体验买单'],
      strengths: ['味觉和视觉审美双重敏锐', '到哪里都能找到好吃的', '懂得犒劳自己，生活幸福感强'],
      blindspots: ['容易吃撑/吃得不健康', '对不「上相」的食物缺乏兴趣', '在健康和享受之间经常选择后者'],
      contentPreferences: ['美食探店/吃播', '菜市场/街头小吃', '高颜值餐厅/甜品', '做饭教程/食材知识'],
      socialStyle: '朋友圈美食博主，每到一处必拍照发图。配文简短，重点在图。',
      idealContent: '色香味俱全，有画面感，有烟火气，让人看了饿。',
      topApps: '大众点评 > 小红书 > 微博',
    },
    'beauty,funny': {
      name: '好色乐子人', emoji: '🤣', tagline: '你负责生产快乐，顺便欣赏美好',
      description: '你的人生哲学简单粗暴：开心就好，好看就赞。你是互联网最阳光的一抹颜色——不装、不丧、不焦虑，只想快乐。',
      personality: ['乐观积极，朋友圈的气氛担当', '笑点适中，不挑食但有品味', '不擅长深度讨论，但聊天轻松愉快', '情绪来得快去得也快'],
      strengths: ['天生的气氛制造者', '能快速让周围人放松下来', '对压力有天然的消化能力'],
      blindspots: ['缺乏深度，容易错过重要信息', '在需要严肃对待的事情上可能不够认真', '逃避痛苦，可能用娱乐来麻痹问题'],
      contentPreferences: ['搞笑合集/段子', '帅哥美女的逗比日常', '宠物搞笑视频', '轻松的综艺/脱口秀片段'],
      socialStyle: '朋友圈快乐源泉，经常发沙雕图/视频。不需要文案，表情包说明一切。',
      idealContent: '能让人笑出来的同时「眼睛也享受」的内容。',
      topApps: '抖音 > 微博 > B站',
    },
    'beauty,tech': {
      name: '科技好色党', emoji: '🤖', tagline: '你用最硬核的方式追求美',
      description: '你相信科技与美丽可以兼得。你是新时代的「技术美学家」——既懂参数，又懂审美，是被代码耽误的艺术从业者。',
      personality: ['理性与感性并存', '喜欢研究「为什么」', '对新事物有强烈好奇心', '审美在线，但需要逻辑支撑'],
      strengths: ['学习能力强，能快速掌握新工具', '审美+技术=罕见的组合优势', '能把自己喜欢的东西「搞懂」'],
      blindspots: ['过度研究可能导致拖延', '对「不理性」的事物缺乏耐心', '容易沉迷工具本身而非目的'],
      contentPreferences: ['数码产品测评/开箱', 'AI/科技前沿', '设计工具教程', '高颜值科技产品外观解析'],
      socialStyle: '偶尔发科技测评，附上自己的实验数据和使用感受。朋友圈科技含量偏高。',
      idealContent: '有技术深度，又有视觉美感的内容。最好能自己动手试试。',
      topApps: '知乎 > B站 > Twitter',
    },
    'beauty,travel': {
      name: '好色旅行家', emoji: '✈️', tagline: '你的旅行清单：好看的都在list上',
      description: '世界那么大，你想去看更好看的。旅行对你而言是流动的审美——每一站都是一次视觉盛宴的收集。',
      personality: ['对世界保持好奇和向往', '行动力强，说走就走', '讨厌无聊和重复', '喜欢分享，但有选择困难'],
      strengths: ['发现美的眼光让你到哪里都是旅行达人', '不满足于打卡，有自己的审美标准', '善于规划，能在有限时间内获取最佳体验'],
      blindspots: ['容易「去了等于没去」——忙着拍照，忘了体验', '可能过度追求网红地点', '旅行回来后整理照片比旅行本身还累'],
      contentPreferences: ['旅行vlog/风景大片', '小众目的地推荐', '高颜值酒店/民宿', '旅拍/胶片感摄影'],
      socialStyle: '朋友圈旅行博主，每一组照片都是精挑细选。定位不一定准确，但滤镜一定到位。',
      idealContent: '有美感、有攻略、有温度的旅行内容。',
      topApps: '小红书 > 微博 > Instagram',
    },
    'ootd,cute': {
      name: '萌系时尚党', emoji: '🎀', tagline: '你的世界里，可爱和好看可以兼得',
      description: '穿搭和萌宠是你最重要的两件事，而且它们之间一点都不矛盾。你是互联网最有爱的时尚达人——衣服上印着小猫，手机里刷着小狗。',
      personality: ['内心柔软，少女心永驻', '对世界有温柔的期待', '喜欢被需要的感觉', '审美偏柔美/清新'],
      strengths: ['审美一致性强，穿搭和喜好高度统一', '容易和人建立情感连接', '生活有仪式感'],
      blindspots: ['面对冲突时可能选择逃避', '过度可爱可能显得不够成熟', '在严肃场合可能显得不够严肃'],
      contentPreferences: ['清新系穿搭/森女风', '萌宠日常', '日系摄影/滤镜教程', '文具/家居/生活好物'],
      socialStyle: '朋友圈很「少女」，但不是矫情的那种。喜欢发有爱的小瞬间。',
      idealContent: '温柔、有爱、有美感的治愈系内容。',
      topApps: '小红书 > 微博 > Instagram',
    },
    'ootd,news': {
      name: '潮流时事党', emoji: '📰', tagline: '你穿得潮，看得远，想得深',
      description: '穿得潮，关注大事。你走在街上是风景，刷手机知天下事。你是时尚和深度的罕见结合体——既能指点江山，又能引领潮流。',
      personality: ['有主见，不随波逐流', '视野广，有社会关怀', '形象和内在都在线', '讨厌空洞，也讨厌无聊'],
      strengths: ['时尚嗅觉和社会洞察力并存', '能做出有内涵的时尚选择', '社交媒体的优质内容生产者'],
      blindspots: ['可能对「不够潮」的人有距离感', '信息广度可能牺牲深度', '在需要放下手机的时候难以做到'],
      contentPreferences: ['潮流趋势+社会议题结合', '有深度的时尚评论', '国际文化观察', '人文社科短内容'],
      socialStyle: '朋友圈有观点，有审美，不刷屏。偶尔发深度内容。',
      idealContent: '有时尚感，有社会洞察，有内容深度。',
      topApps: '微博 > 知乎 > 小红书',
    },
    'ootd,food': {
      name: '美食穿搭党', emoji: '👗', tagline: '出门要穿得美，吃饭要吃得好',
      description: '你是精致生活的代言人。穿搭和美食是你经营生活的两大抓手——不出门也要穿得好看，不出门也要吃得讲究。',
      personality: ['生活品质要求高', '愿意为审美买单', '务实但讲究仪式感', '不委屈自己'],
      strengths: ['到哪里都能兼顾美食和美', '朋友圈的精致生活标本', '能发现又好看又好吃的店'],
      blindspots: ['可能过于追求形式', '对不修边幅的人和场合缺乏耐心', '精致生活的压力可能转嫁给他人'],
      contentPreferences: ['美食+穿搭结合的内容', '高颜值餐厅探店', '生活美学/家居', '精致一人食'],
      socialStyle: '朋友圈精致生活博主，每一条都是精心策划。',
      idealContent: '好看+好吃，有生活气息。',
      topApps: '小红书 > 大众点评 > Instagram',
    },
    'ootd,funny': {
      name: '时尚搞笑党', emoji: '😂', tagline: '你穿得比谁都好，笑得比谁都真',
      description: '穿得有趣，看得开心。你是朋友圈的快乐制造机——既能让人眼前一亮，又能让人笑出声。',
      personality: ['有表现欲，但不自恋', '幽默感强，不矫情', '社交场合的焦点人物', '自嘲能力强'],
      strengths: ['天生的时尚表达者', '能用穿搭讲笑话', '社交吸睛能力强'],
      blindspots: ['可能过度在意他人的看法', '在不需要表现的场合可能用力过猛', '幽默可能偶尔踩雷'],
      contentPreferences: ['时尚搞笑内容', '穿搭翻车/种草', '潮牌/小众设计', '时尚博主的日常vlog'],
      socialStyle: '朋友圈时尚博主，穿搭必有亮点，配文必有笑点。是朋友圈的点开率保障。',
      idealContent: '好看+好笑，最好能引发讨论。',
      topApps: '微博 > 小红书 > Instagram',
    },
    'ootd,travel': {
      name: '旅行时尚党', emoji: '🌍', tagline: '你的朋友圈是视觉盛宴，行李箱是时尚展台',
      description: '旅行的意义是拍好看的照片，朋友圈的点赞收割机。你是朋友圈的视觉担当——每到一处，都留下一组大片。',
      personality: ['有审美追求，不满足于普通', '愿意为好照片付出时间', '对目的地有选择倾向', '形象管理意识强'],
      strengths: ['审美能力让你去哪里都能出片', '穿搭和场景结合的能力强', '社交媒体运营能力强'],
      blindspots: ['可能为了拍照而忽略体验本身', '过度依赖滤镜和修图', '在需要放下手机的时候难以做到'],
      contentPreferences: ['旅拍大片/时尚旅行vlog', '小众目的地', '高颜值酒店/民宿', '穿搭和场景结合的内容'],
      socialStyle: '朋友圈精修图担当，九宫格必属佳作。点赞收割机。',
      idealContent: '有美感、有场景感、有穿搭内容的旅行大片。',
      topApps: '小红书 > Instagram > 微博',
    },
    'news,cute': {
      name: '时事云吸党', emoji: '🐱', tagline: '白天忧国忧民，晚上云吸猫',
      description: '你是互联网最分裂的正能量——白天关心世界局势，晚上被猫猫视频治愈。你在深刻和浅薄之间来回横跳，形成了独特的平衡。',
      personality: ['信息焦虑和治愈需求并存', '有社会责任感，但需要逃离现实', '内心敏感，容易被萌宠击中', '对负面新闻的消化能力有限'],
      strengths: ['视野广，既有深度又不失趣味', '情绪调节能力强，知道何时该抽离', '能理性讨论问题，也能单纯快乐'],
      blindspots: ['可能陷入刷完更空虚的死循环', '信息过载但缺乏系统整理', '云吸可能替代真实情感连接'],
      contentPreferences: ['时事新闻/深度报道', '萌宠治愈视频', '睡前ASMR/白噪音', '轻松和深度交替消费'],
      socialStyle: '朋友圈偶尔转发深度内容，但不会刷屏。猫猫视频是永远的社交货币。',
      idealContent: '能让人看完有收获但又很治愈的内容组合。',
      topApps: '微博 > 微信公众号 > B站',
    },
    'news,food': {
      name: '美食时事党', emoji: '🍔', tagline: '你的胃和脑子都在同步运转',
      description: '关心国家大事，也不忘犒劳自己。你是真正的人间清醒——知道什么时候该严肃，什么时候该吃饭。',
      personality: ['务实，不走极端', '有责任感但不紧绷', '生活平衡大师', '朋友圈的信息密度高'],
      strengths: ['视野与生活品质兼顾', '能严肃讨论，也能轻松社交', '情绪稳定，不易被带节奏'],
      blindspots: ['可能对任何事情都停留在「知道」层面', '缺乏深度钻研', '在重大决策上可能过于求稳'],
      contentPreferences: ['深度新闻报道', '美食探店', '人文纪录片', '两者的结合内容'],
      socialStyle: '朋友圈内容多样，有深度转发，也有深夜报复社会。配文通常有观点。',
      idealContent: '有内容深度，附赠生活温度。',
      topApps: '微博 > 知乎 > 微信公众号',
    },
    'news,funny': {
      name: '键政乐子人', emoji: '🎤', tagline: '你的评论区战斗力，和你的笑点一样高',
      description: '你可能是评论区最活跃的人——又关心时事，又爱玩梗。你在严肃和娱乐之间找到了独特的生存之道：笑着说出重要的事。',
      personality: ['嘴炮能力强，观点犀利', '讨厌无聊的正襟危坐', '社交媒体是你的辩论场', '情绪表达直接，不喜欢绕弯子'],
      strengths: ['信息获取全面，有自己的判断力', '能把复杂问题简单化表达', '是天生的内容评论家和二次创作者'],
      blindspots: ['容易陷入无意义的骂战', '为了反驳而反驳', '在娱乐化中可能消解了问题的严肃性'],
      contentPreferences: ['时事热点/新闻吐槽', '讽刺类短视频/脱口秀', '微博热搜评论区', '政治八卦/国际局势'],
      socialStyle: '朋友圈话痨，但每条都有观点。喜欢转发+评论，是朋友圈的意见领袖（自封的）。',
      idealContent: '有信息量，有观点，有笑点。拒绝空洞说教。',
      topApps: '微博 > 知乎 > Twitter',
    },
    'news,travel': {
      name: '旅行时事党', emoji: '🗺️', tagline: '你的梦想是走遍世界看懂世界',
      description: '读万卷书，行万里路，你的梦想是走遍世界看懂世界。你不满足于表面的风景，要的是理解世界的运行逻辑。',
      personality: ['好奇心强，视野广', '有深度思考的习惯', '讨厌走马观花', '有宏大叙事倾向'],
      strengths: ['知识面广，能做跨文化比较', '旅行有深度收获', '能理性分析不同社会的运作方式'],
      blindspots: ['过度追求意义可能让旅行变累', '可能显得有点说教', '在娱乐性旅行中可能找不到节奏'],
      contentPreferences: ['深度旅行文学', '历史地理人文纪录片', '国际局势分析', '目的地深度背景资料'],
      socialStyle: '朋友圈旅行分享偏人文视角，有思考，有见地。偶尔长文。',
      idealContent: '有深度、有视角、有信息量的旅行内容。',
      topApps: '知乎 > 豆瓣 > 微信公众号',
    },
    'cute,food': {
      name: '萌宠美食党', emoji: '🍖', tagline: '你的人生支柱：主子+好吃的',
      description: '吸猫+美食，你的人生两大支柱。幸福对你来说很简单——一个毛茸茸的小东西，一顿热腾腾的好饭，世界就美好了。',
      personality: ['内心柔软，容易满足', '生活简单纯粹', '有爱心，社交偏熟人', '不喜欢复杂的人际关系'],
      strengths: ['容易获得幸福感', '是天生的治愈系', '能发现生活中的小确幸'],
      blindspots: ['可能过度依赖宠物和食物来获得情感满足', '社交圈可能偏小', '面对压力时倾向于逃避而非解决'],
      contentPreferences: ['萌宠日常/吃播合集', '一人食/治愈系美食', '宠物+美食的结合', '轻松的下饭内容'],
      socialStyle: '朋友圈日常分享，主子和美食。偶尔深夜报复社会。',
      idealContent: '看完心化了，肚子也饿了。',
      topApps: '微博 > 小红书 > B站',
    },
    'cute,funny': {
      name: '搞笑吸宠党', emoji: '🐶', tagline: '你的快乐来源：猫狗+段子',
      description: '笑点和萌点同样高，你是最容易开心的快乐星球原住民。别人刷手机越刷越焦虑，你刷手机越刷越治愈。',
      personality: ['童心未泯，内心柔软', '笑点低，泪点也低', '不喜欢复杂的人际关系', '简单直接，不爱绕弯子'],
      strengths: ['情绪稳定，不容易被激怒', '社交场合的润滑剂', '能把快乐传染给周围的人'],
      blindspots: ['面对严肃话题可能不够认真', '过度依赖娱乐来逃避问题', '可能显得不够成熟/深沉'],
      contentPreferences: ['萌宠搞笑合集', '动物暖心故事', '沙雕日常/表情包', '轻松的搞笑短视频'],
      socialStyle: '朋友圈快乐源泉，经常转发猫猫狗狗。不需要文案，发表情就够了。',
      idealContent: '看完能笑出来，心都化了的内容。',
      topApps: '抖音 > B站 > 微博',
    },
    'cute,travel': {
      name: '旅行吸宠党', emoji: '🦮', tagline: '你的旅行清单上，每一站都有小动物',
      description: '旅行的意义是发现更多可爱的动物。你是行走的动物园——去哪个国家，都要找机会撸一把当地的猫狗。',
      personality: ['有爱心，喜欢小动物', '好奇心强，对陌生环境既向往又谨慎', '喜欢有温度的旅行体验', '对动物保护话题有天然关注'],
      strengths: ['能发现宠物友好的旅行目的地', '旅行体验有独特的情感维度', '对细节敏感，能注意到动物相关的美好'],
      blindspots: ['可能因为宠物需求而限制旅行选择', '对景点的关注可能被宠物分散', '在动物问题上的情感投入可能过深'],
      contentPreferences: ['动物主题旅行', '宠物可进入的景点/餐厅', '各国撸猫撸狗指南', '动物保护纪实'],
      socialStyle: '朋友圈晒主子+旅行目的地组合。定位经常是动物园或宠物咖啡馆。',
      idealContent: '有萌宠、有旅行、有温暖的结合内容。',
      topApps: '小红书 > 微博 > Instagram',
    },
    'cute,tech': {
      name: '科技吸宠党', emoji: '📱', tagline: '你用最贵的设备云吸最可爱的猫',
      description: '你可能是用最贵手机云吸猫的人。科技是你的工具，萌宠是你的精神寄托——你用技术的方式满足最原始的情感需求。',
      personality: ['理性外壳包裹柔软内心', '对新工具极度热衷', '有点宅，但不完全封闭', '追求效率，能用机器解决的不用人'],
      strengths: ['能快速找到/整理海量萌宠内容', '会用科技手段提升生活质量', '技术+情感=独特的解决问题方式'],
      blindspots: ['可能过度依赖屏幕来获得情感满足', '社交圈可能偏线上', '对现实中的宠物养育意愿和能力存疑'],
      contentPreferences: ['高清猫猫视频', '宠物科技产品测评', 'AI生成萌宠内容', '宠物社交平台'],
      socialStyle: '社交媒体宠物账号收藏量大，偶尔转发科技+萌宠结合的内容。',
      idealContent: '高清、有质感、能舔屏的萌宠内容。',
      topApps: '微博 > B站 > Twitter',
    },
    'food,funny': {
      name: '搞笑干饭人', emoji: '🍕', tagline: '你的人生：吃好吃的，看好笑的',
      description: '你的人生哲学简单到了极致：吃好吃的，看好笑的。这两件事构成了你幸福感的90%。你是最容易满足的人，也是朋友圈里最快乐的人。',
      personality: ['活在当下，不纠结未来', '情绪稳定，不易被小事影响', '社交场合接地气', '对生活的期待简单纯粹'],
      strengths: ['容易获得幸福感', '到哪里都能找到好吃的', '是天生的美食搭档'],
      blindspots: ['可能缺乏长线规划', '面对压力时倾向于逃避而非解决', '过度追求即时满足'],
      contentPreferences: ['美食探店/吃播', '下饭综艺/搞笑视频', '快手菜/懒人食谱', '食物表情包/沙雕日常'],
      socialStyle: '朋友圈美食+搞笑担当。经常发深夜报复社会的食物图，配文简短直接。',
      idealContent: '下饭！好吃！好笑！三者占一即可。',
      topApps: '大众点评 > 抖音 > 微博',
    },
    'food,travel': {
      name: '美食旅行家', emoji: '🍜', tagline: '你的旅行只有一个目标：吃',
      description: '旅行就是去吃当地最好吃的——你是最务实的旅行家。别人去巴黎看铁塔，你去巴黎吃法餐。你的人生名言：不吃等于没去。',
      personality: ['务实，不搞虚的', '行动力强，说吃就去吃', '对体验的追求超过对物质的追求', '愿意为美食排队等候'],
      strengths: ['到哪里都能找到最地道的美食', '味觉记忆丰富，是行走的情报库', '生活体验丰富，朋友圈素材不断'],
      blindspots: ['可能忽视景点的文化价值', '为了吃可能牺牲行程', '体重管理是永恒的挑战'],
      contentPreferences: ['地道美食探店', '当地菜市场/街边小吃', '食物历史/文化纪录片', '米其林/高端餐饮'],
      socialStyle: '朋友圈美食博主，每到一处必有美食九宫格。配文简短：「绝了」「必须来」「不踩雷」。',
      idealContent: '有烟火气、有故事、有味道的美食内容。',
      topApps: '大众点评 > 小红书 > 微博',
    },
    'food,tech': {
      name: '科技美食党', emoji: '🤖', tagline: '你用科技的方式解锁每一顿美食',
      description: '你是新人类的美食家——科技是你探索美食的武器。你用算法找店，用数据选菜，用工具做饭。吃饭这件事，被你玩出了技术含量。',
      personality: ['数据驱动，相信参数', '喜欢折腾厨房和工具', '追求效率，能自动化就不手动', '偶尔会为了工具本身而忘了目的'],
      strengths: ['能理性分析哪一家更好吃', '厨艺提升快，善于利用工具', '能发现普通人注意不到的美食细节'],
      blindspots: ['过度依赖推荐，丧失自主发现能力', '可能为了优化而错过即兴美食体验', '在厨房花的时间可能超过吃饭本身'],
      contentPreferences: ['科技选餐/数据分析选店', '厨房工具/黑科技烹饪', '分子料理/食物科学', 'AI美食推荐/APP教程'],
      socialStyle: '偶尔发厨房实验成果，配上技术参数。朋友圈科技感十足。',
      idealContent: '有技术含量、有数据支撑、最好能自己复刻的美食内容。',
      topApps: '知乎 > 大众点评 > B站',
    },
    'funny,travel': {
      name: '旅行乐子人', emoji: '🌴', tagline: '你的旅行只有一个目的：开心',
      description: '你的旅行哲学简单直接：去哪儿不重要，和谁一起，开心最重要。你是朋友圈最会玩的那个——不是因为去了多远的地方，而是因为玩得多尽兴。',
      personality: ['体验派，不追求打卡数量', '社交能力强，是旅行中的气氛担当', '随遇而安，不纠结攻略', '讨厌计划赶不上变化'],
      strengths: ['到哪里都能找到乐子', '和任何人都能玩到一起', '活在当下，不焦虑未来'],
      blindspots: ['旅行回来啥攻略都写不出来', '容易冲动消费/超支', '错过需要深度的目的地体验'],
      contentPreferences: ['旅行vlog/搞笑合集', '小众/冷门目的地', '旅行翻车/意外惊喜', '和朋友的旅行日常'],
      socialStyle: '朋友圈旅行分享，图文并茂，有笑点。喜欢发九宫格，配文接地气。',
      idealContent: '有笑点、有温度、有意外感的旅行内容。',
      topApps: '小红书 > 抖音 > 微博',
    },
    'funny,tech': {
      name: '科技乐子人', emoji: '😎', tagline: '你在笑的时候，顺便改变了世界',
      description: '你是互联网的快乐源泉——科技和幽默是你最爱的两件事。当别人在认真讨论AI能改变什么，你在用表情包解析大模型。',
      personality: ['幽默是外壳，理性是内核', '能严肃也能沙雕，切换自如', '社交媒体的重度用户', '喜欢用搞笑的方式表达深刻观点'],
      strengths: ['天生的内容创作者', '能让复杂信息被大众接受', '社交影响力强，容易传播观点'],
      blindspots: ['过度娱乐化可能消解严肃议题', '为搞笑可能牺牲准确性', '在需要专注的任务上容易被新乐子分心'],
      contentPreferences: ['科技吐槽/梗图', 'AI/编程搞笑内容', '技术前沿的娱乐化解说', '科技博主搞笑合集'],
      socialStyle: '朋友圈段子手，科技+搞笑混搭。不需要解释，笑就完了。',
      idealContent: '好笑+有料，最好有信息增量。拒绝无聊的正经内容。',
      topApps: 'Twitter > B站 > 微博',
    },
    'travel,tech': {
      name: '科技旅行家', emoji: '🚀', tagline: '你的旅行充满代码和远方',
      description: '你的旅行充满了科技感——探索世界与科技的边界是你永恒的主题。别人去旅行是放松，你去旅行是「考察」。',
      personality: ['好奇心驱动，不满足于表面的风景', '有系统性，喜欢规划', '技术思维让你能深入理解当地', '追求独特体验，讨厌打卡式旅行'],
      strengths: ['能发现普通游客注意不到的东西', '旅行规划和执行效率高', '科技+人文的独特视角'],
      blindspots: ['可能过度计划而失去旅行的惊喜感', '技术细节可能喧宾夺主', '和非科技爱好者旅行时可能有代沟'],
      contentPreferences: ['科技前沿探访/实验室参观', '未来城市/智慧城市', '旅行科技装备测评', '科技与人文结合的深度游'],
      socialStyle: '朋友圈旅行分享视角独特，有科技也有人文。偶尔发设备开箱。',
      idealContent: '有科技感、有深度、有独特视角的旅行内容。',
      topApps: '知乎 > 小红书 > Twitter',
    },
    'beauty,beauty': {
      name: '纯正好色党', emoji: '😍', tagline: '在这个看脸的世界，你活得最真实',
      description: '在这个看脸的世界，你活得最真实。不装、不掩饰、不虚伪——好看就是正义，颜值就是真理。',
      personality: ['坦诚直接，不喜欢绕弯子', '审美要求高', '有表现欲，愿意展示自己', '对「丑」缺乏耐心'],
      strengths: ['审美能力出众', '形象管理能力强', '是天然的视觉内容生产者'],
      blindspots: ['可能过度在意外表', '可能忽视内在价值', '对不好看的事物/人缺乏耐心'],
      contentPreferences: ['高颜值博主/明星', '美妆/穿搭/护肤', '视觉系艺术', '帅哥美女日常'],
      socialStyle: '朋友圈有大量的「好看」内容。发的图都是精挑细选的。',
      idealContent: '颜值即正义，好看就完事了。',
      topApps: '小红书 > Instagram > 微博',
    },
    'ootd,ootd': {
      name: '纯正时尚党', emoji: '👠', tagline: '穿搭是你的信仰，时尚是你的灵魂',
      description: '你是朋友圈的时尚风向标。穿搭对你而言不是选择，是表达。你相信形象就是态度，风格就是语言。',
      personality: ['有极强的审美自我认知', '不追随潮流，但了解潮流', '形象是社交的第一语言', '对时尚行业有持续关注'],
      strengths: ['穿搭辨识度高，不容易撞衫', '对色彩和搭配有系统理解', '能引导而非跟随潮流'],
      blindspots: ['可能对不够时尚的人或场合有距离感', '过度投入时尚可能消耗其他生活维度', '形象管理时间成本高'],
      contentPreferences: ['设计师品牌/小众设计', '时尚周街拍', '穿搭干货/色彩搭配', '时尚历史/品牌故事'],
      socialStyle: '朋友圈时尚博主，每一组穿搭都是作品。点赞评论的都是同好。',
      idealContent: '有风格、有态度、有质感的内容。',
      topApps: 'Instagram > 小红书 > 微博',
    },
    'news,news': {
      name: '纯正时事党', emoji: '📺', tagline: '家事国事天下事，事事关心',
      description: '在这个碎片化的时代，你是难得的信息深度消费者。家事国事天下事，你事事关心；而且不只关心，还爱琢磨。',
      personality: ['有社会责任感', '喜欢深度思考', '信息获取全面，不偏信单一来源', '有观点，不轻易被带节奏'],
      strengths: ['视野广，思考有深度', '能理性分析复杂问题', '是朋友圈的事实核查担当'],
      blindspots: ['信息过载可能导致焦虑', '容易陷入负面新闻的漩涡', '对不关心新闻的人可能觉得孤独'],
      contentPreferences: ['深度报道/特稿', '国际局势分析', '调查新闻', '非虚构写作'],
      socialStyle: '朋友圈偶尔转发深度内容，附上简短评论。是朋友圈的信息过滤器。',
      idealContent: '有深度、有来源、有观点的严肃内容。',
      topApps: '财新 > 澎湃 > 知乎',
    },
    'cute,cute': {
      name: '纯正吸宠党', emoji: '🐈', tagline: '没有什么是云吸一只猫解决不了的',
      description: '没有什么是云吸一只猫解决不了的，如果有，就两只。在这个焦虑的时代，你找到了最柔软的避风港。',
      personality: ['内心柔软，情感细腻', '对弱小有保护欲', '容易共情，也容易受伤', '生活简单，追求小确幸'],
      strengths: ['情绪调节能力强', '是天生的治愈系', '能感知他人情绪，容易建立信任'],
      blindspots: ['可能过度依赖宠物获得情感满足', '对负面新闻的承受能力弱', '在需要「狠心」的时候做不到'],
      contentPreferences: ['猫猫/狗狗日常', '萌宠暖心故事', 'ASMR/白噪音', '宠物养育知识'],
      socialStyle: '朋友圈云吸担当，主子日常。配文简短，表情众多。',
      idealContent: '看完心化了，焦虑全消了。',
      topApps: '微博 > B站 > 小红书',
    },
    'food,food': {
      name: '纯正干饭人', emoji: '🍽️', tagline: '要么吃，要么在去吃的路上',
      description: '你的人生格言简单直接：要么吃，要么在去吃的路上。美食是你的信仰，胃是你的神明。每天最认真做的事：想了很久然后去吃。',
      personality: ['务实，不喜欢绕弯子', '活在当下', '行动力强，尤其在吃这件事上', '对美食有强烈热情'],
      strengths: ['味觉敏锐，能快速判断好不好吃', '到哪里都能找到好吃的', '是天生的美食探索者'],
      blindspots: ['体重管理是永恒课题', '可能为了吃牺牲其他事情', '过度追求美食可能忽略生活其他维度'],
      contentPreferences: ['美食探店/吃播', '快手菜谱', '深夜报复社会', '食物测评/横评'],
      socialStyle: '朋友圈美食博主，每顿都值得发。深夜发图频率最高。',
      idealContent: '看完想立刻冲去吃。',
      topApps: '大众点评 > 抖音 > 小红书',
    },
    'tech,tech': {
      name: '纯正科技党', emoji: '💻', tagline: '代码是你的诗，参数是你的远方',
      description: '代码是你的诗，参数是你的远方。在这个娱乐至死的时代，你是少数还在认真琢磨「这个东西是怎么运作的」的人。',
      personality: ['好奇心强，刨根问底', '喜欢系统性和逻辑性', '对新事物有强烈学习欲望', '表达偏技术语言'],
      strengths: ['学习能力强，尤其是技术领域', '能快速理解复杂系统的运作', '技术变现能力强'],
      blindspots: ['和非技术人群沟通可能有障碍', '过度钻研细节可能迷失方向', '在需要创意的工作上可能不够灵活'],
      contentPreferences: ['科技前沿/论文解读', '编程教程/工具推荐', '数码产品测评', '技术深度分析'],
      socialStyle: '朋友圈技术内容偏多，偶尔转发行业观点。配文简短专业。',
      idealContent: '有技术深度，有逻辑，能学到东西。',
      topApps: '知乎 > Twitter > GitHub',
    },
    'funny,funny': {
      name: '纯正乐子人', emoji: '🎉', tagline: '你的存在就是为了给世界带来快乐',
      description: '你的存在就是为了给世界带来快乐。在这个全员焦虑的时代，你是难得的正能量——不丧、不卷，只想开心。',
      personality: ['天生乐观，情绪稳定', '笑点低，共情能力强', '社交场合的气氛担当', '不喜欢严肃讨论'],
      strengths: ['是天生的快乐传播者', '能快速化解尴尬', '情绪调节能力强'],
      blindspots: ['在需要严肃对待的事情上可能不够认真', '可能逃避深层对话', '过度娱乐可能让人缺乏深度'],
      contentPreferences: ['搞笑合集/段子', '沙雕图/表情包', '轻松综艺/脱口秀', '朋友的日常搞笑'],
      socialStyle: '朋友圈快乐源泉，经常发沙雕内容。不需要文案，一个表情包就够了。',
      idealContent: '看完笑出声，就够了。',
      topApps: '抖音 > 微博 > B站',
    },
    'travel,travel': {
      name: '纯正旅行家', emoji: '🌍', tagline: '世界那么大，你一直在路上',
      description: '世界那么大，你一直在路上。你是朋友圈的旅行图鉴——去过的地方比谁都多，照片比谁都精彩。',
      personality: ['好奇心强，向往未知', '行动力高，说走就走', '不喜欢重复，追求新鲜感', '有分享欲，但有选择性'],
      strengths: ['旅行经验丰富，见多识广', '能快速适应新环境', '善于规划，能在有限时间获取最佳体验'],
      blindspots: ['可能陷入打卡式旅行', '回来后整理照片比旅行本身还累', '在稳定生活中可能感到无聊'],
      contentPreferences: ['旅行vlog/攻略', '小众目的地', '旅拍大片', '旅行中的意外和故事'],
      socialStyle: '朋友圈旅行博主，每一组照片都是精心策划。点赞收割机。',
      idealContent: '有美感，有故事，有实用信息的旅行内容。',
      topApps: '小红书 > 微博 > Instagram',
    },
  };

  return allTypes[key] || allTypes[keyRev] || {
    name: '均衡刷手', emoji: '🎯', tagline: '你是全面发展的六边形战士',
    description: '你的爱好分布均匀，是个全面发展的互联网冲浪选手。没有明显的偏科，但也意味着你没有极端的标签——这是好事，也可能是一种遗憾。',
    personality: ['兴趣广泛，但没有强烈执念', '信息获取渠道多元', '不容易被单一内容类型满足', '适合泛浏览而非深度消费'],
    strengths: ['视野全面，不偏科', '兴趣多样，话题广泛', '不容易信息茧房'],
    blindspots: ['缺乏深度，可能什么都懂一点但都不精', '难以形成独特的个人标签', '在需要专注的领域可能不够深入'],
    contentPreferences: ['多样混合，取决于当日心情', '偶尔深度消费，但难以持续', '没有固定的内容依赖'],
    socialStyle: '朋友圈内容多样，但量不大。转发随心情，不运营。',
    idealContent: '什么都能看，不挑，但希望能发现惊喜。',
    topApps: '微博 > 知乎 > 抖音',
  };
}

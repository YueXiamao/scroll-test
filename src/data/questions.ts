export interface ScoreType {
  beauty: number;      // 美女
  ootd: number;         // 穿搭
  news: number;         // 时政
  cute: number;         // 萌宠
  food: number;         // 美食
  tech: number;         // 科技
  funny: number;        // 搞笑
  travel: number;      // 旅行
}

export interface Option {
  text: string;
  scores: ScoreType;
}

export interface Question {
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    text: "周末下午你终于有空刷手机，你会先点开哪个？",
    options: [
      { text: "直播间看看有什么好看的", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿搭博主又发了什么新搭配", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "国际局势有什么新进展", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "萌宠视频合集治愈一下", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "看看附近有什么好吃的", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "刷到一个视频还没看完，你更想看下去的原因是？",
    options: [
      { text: "主播太好看了", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "这身衣服太种草了", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "这个新闻背后有内幕", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "这只猫/狗太可爱了", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "这个餐厅看起来好好吃", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "朋友给你推荐一个博主，你会因为什么关注TA？",
    options: [
      { text: "长得好看，赏心悦目", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿搭品味很好，值得借鉴", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "分析问题很深刻，有见地", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 0, travel: 0 } },
      { text: "宠物视频太治愈了", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "探店视频很实用", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你给朋友分享一个视频，更可能是因为？",
    options: [
      { text: "太好看了，忍不住分享", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "这套搭配太绝了", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "这个新闻太离谱了", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "这只猫笑死我了/太萌了", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 2, travel: 0 } },
      { text: "这家店必须去打卡", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "以下哪个视频类型你能一直刷停不下来？",
    options: [
      { text: "颜值主播合集", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "每日穿搭分享", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "国际形势深度分析", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "猫咪狗狗卖萌集锦", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "美食探店Vlog", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你更愿意为什么内容付费？",
    options: [
      { text: "颜值博主的高级会员", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿搭课程或搭配指导", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "深度新闻报道或分析", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "宠物用品或周边", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "美食课程或餐厅会员", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "刷到一条明显是剧本摆拍的视频，你的反应是？",
    options: [
      { text: "无所谓，好看就行", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "衣服好看就继续看", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "假的就是假的，嗤之以鼻", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "管它真假，猫可爱就完事了", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 2, travel: 0 } },
      { text: "能拍得让人想吃也行", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你最讨厌在推荐里看到什么内容？",
    options: [
      { text: "千篇一律的网红脸", scores: { beauty: -1, ootd: 0, news: 1, cute: 0, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "丑穿搭博主的过度营销", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "无聊的流水账日常", scores: { beauty: 0, ootd: 1, news: 2, cute: 0, food: 0, tech: 0, funny: 2, travel: 0 } },
      { text: "虐猫/弃猫相关内容", scores: { beauty: 0, ootd: 0, news: 1, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "探店恰烂钱的视频", scores: { beauty: 0, ootd: 0, news: 1, cute: 0, food: 2, tech: 0, funny: 1, travel: 0 } },
    ]
  },
  {
    text: "如果只能保留三个关注的博主，你会保留哪三类？",
    options: [
      { text: "美女/帅哥类", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿搭时尚类", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "时政新闻类", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "萌宠类", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "美食类", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你在地铁上会用什么打发时间？",
    options: [
      { text: "刷颜值视频/直播", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "看穿搭灵感", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "刷新闻资讯", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "看萌宠视频", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "看美食博主下饭", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你更关注博主本人的什么特质？",
    options: [
      { text: "外表和身材", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "时尚品味", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "思想深度", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 0, travel: 0 } },
      { text: "宠物的可爱程度", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "推荐的东西好不好吃", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你认为一个好的博主最重要的是？",
    options: [
      { text: "长得好看", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿得好看", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "观点有价值", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "能带来快乐", scores: { beauty: 0, ootd: 0, news: 0, cute: 2, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "实用不踩雷", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "晚上睡前你最后一件事通常是？",
    options: [
      { text: "再看会儿美女/帅哥", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "刷穿搭找灵感", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "看看今天发生了什么大事", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "云吸猫/云撸狗", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "看吃播入睡", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你看到一个博主恰饭了你的反应是？",
    options: [
      { text: "好看就行，恰饭怎么了", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 1, tech: 0, funny: 0, travel: 0 } },
      { text: "看是不是真适合自己", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 1, tech: 0, funny: 0, travel: 0 } },
      { text: "又恰饭，真没意思", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "希望TA推荐的宠物用品好用", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "正好看看探店靠不靠谱", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你更喜欢什么样的内容风格？",
    options: [
      { text: "高颜值视觉系", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "精致时尚感", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "深度犀利评论", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 0, travel: 0 } },
      { text: "治愈可爱风", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "真实接地气", scores: { beauty: 0, ootd: 0, news: 1, cute: 0, food: 3, tech: 0, funny: 1, travel: 0 } },
    ]
  },
  {
    text: "以下哪个词最能描述你的刷手机心态？",
    options: [
      { text: "赏心悦目", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "穿搭参考", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "紧跟时事", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "治愈解压", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "种草拔草", scores: { beauty: 0, ootd: 2, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "如果你的手机只能装一个类型的APP，你会选？",
    options: [
      { text: "短视频/直播平台", scores: { beauty: 3, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "时尚穿搭类", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "新闻资讯类", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "宠物社区类", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "美食点评类", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 0 } },
    ]
  },
];

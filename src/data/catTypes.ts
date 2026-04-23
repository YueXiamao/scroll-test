import type { ScoreType } from './questions';

export function calculateDimensionPercentages(scores: ScoreType): Record<string, number> {
  const total = scores.beauty + scores.ootd + scores.news + scores.cute + scores.food + scores.tech + scores.funny + scores.travel;
  if (total === 0) return { beauty: 50, ootd: 50, news: 50, cute: 50, food: 50, tech: 50, funny: 50, travel: 50 };
  return {
    beauty: Math.round((scores.beauty / total) * 100),
    ootd: Math.round((scores.ootd / total) * 100),
    news: Math.round((scores.news / total) * 100),
    cute: Math.round((scores.cute / total) * 100),
    food: Math.round((scores.food / total) * 100),
    tech: Math.round((scores.tech / total) * 100),
    funny: Math.round((scores.funny / total) * 100),
    travel: Math.round((scores.travel / total) * 100),
  };
}

export function getTitleForCategory(category: string, pct: number): string {
  const titles: Record<string, string[]> = {
    beauty: ['柳下惠', '正经人', '有点东西', '色狼', '色魔', '鉴屎官'],
    ootd: ['时尚绝缘体', '偶尔看看', '潮流达人', '穿搭博主', '时尚教母'],
    news: ['两耳不闻窗外事', '轻度关注', '时事达人', '键政侠', '战鹰'],
    cute: ['冷血动物', '云吸用户', '轻度吸宠', '重度铲屎官', '动物园园长'],
    food: ['神仙', '偶尔馋了', '干饭人', '美食家', '探店狂魔'],
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

export function getOverallType(percentages: Record<string, number>): { name: string; emoji: string; description: string } {
  // 找最高的两项
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 2).map(([k]) => k);

  const typeMap: Record<string, { name: string; emoji: string; description: string }> = {
    'beauty,cute': { name: '好色吸猫党', emoji: '🥰', description: '嘴上喊着看美女，手里刷着猫猫视频，你是互联网最矛盾的快乐星球生物。' },
    'beauty,ootd': { name: '颜值穿搭党', emoji: '💃', description: '好看的人+好看的衣服=完美的世界。你对美的追求达到了登峰造极的境界。' },
    'beauty,news': { name: '正义好色人', emoji: '🛡️', description: '既关心国家大事，又不忘欣赏美好事物。你是真正的社会栋梁+视觉动物。' },
    'beauty,food': { name: '美食好色客', emoji: '🍜', description: '秀色可餐在你这里不是比喻，是字面意思。你的人生追求：吃好吃的，看好看的。' },
    'beauty,funny': { name: '好色乐子人', emoji: '🤣', description: '你的人生哲学：开心就好，好看就赞。你是互联网最阳光的一抹色。' },
    'beauty,tech': { name: '科技好色党', emoji: '🤖', description: '你相信科技与美丽可以兼得，既是技术宅又懂审美，是新时代的全能选手。' },
    'beauty,travel': { name: '好色旅行家', emoji: '✈️', description: '世界那么大，你想去看更好看的。旅行的意义对你来说是发现更多美。' },
    'ootd,cute': { name: '萌系时尚党', emoji: '🎀', description: '穿搭和萌宠是你最重要的两件事。你可能是最有爱的时尚达人。' },
    'ootd,news': { name: '潮流时事党', emoji: '📰', description: '穿得潮，关注大事。你走在街上是风景，刷手机知天下。' },
    'ootd,food': { name: '美食穿搭党', emoji: '👗', description: '出门要穿得美，吃饭要吃得好。你是精致生活的代言人。' },
    'ootd,funny': { name: '时尚搞笑党', emoji: '😂', description: '穿得有趣，看得开心。你是朋友圈的快乐制造机。' },
    'ootd,travel': { name: '旅行时尚党', emoji: '🌍', description: '旅行的意义是拍好看的照片，朋友圈的点赞收割机。' },
    'news,cute': { name: '时事云吸党', emoji: '🐱', description: '白天忧国忧民，晚上云吸猫。你是互联网最分裂的正能量。' },
    'news,food': { name: '美食时事党', emoji: '🍔', description: '关心国家大事，也不忘犒劳自己。你是真正的人间清醒。' },
    'news,funny': { name: '键政乐子人', emoji: '🎤', description: '你可能是评论区最活跃的人，又关心时事又爱玩梗。' },
    'news,travel': { name: '旅行时事党', emoji: '🗺️', description: '读万卷书行万里路，你的梦想是走遍世界看懂世界。' },
    'cute,food': { name: '萌宠美食党', emoji: '🍖', description: '吸猫+美食，你的人生两大支柱。幸福对你来说很简单。' },
    'cute,funny': { name: '搞笑吸宠党', emoji: '🐶', description: '笑点和萌点同样高，你是最容易开心的快乐星球原住民。' },
    'cute,travel': { name: '旅行吸宠党', emoji: '🦮', description: '旅行的意义是发现更多可爱的动物，你是行走的动物园。' },
    'cute,tech': { name: '科技吸宠党', emoji: '📱', description: '你可能是用最贵手机云吸猫的人，科技与治愈并存。' },
    'food,funny': { name: '搞笑干饭人', emoji: '🍕', description: '你的人生：吃好吃的，看好笑的。简单快乐就是真谛。' },
    'food,travel': { name: '美食旅行家', emoji: '🍜', description: '旅行就是去吃当地最好吃的，你可能是最务实的旅行家。' },
    'food,tech': { name: '科技美食党', emoji: '🤖', description: '你用科技寻找美食，用美食犒劳自己，是新人类的美食家。' },
    'funny,travel': { name: '旅行乐子人', emoji: '🌴', description: '你的旅行哲学：开心最重要。你可能是朋友圈最会玩的人。' },
    'funny,tech': { name: '科技乐子人', emoji: '😎', description: '你是互联网的快乐源泉，科技和幽默是你最爱的两件事。' },
    'travel,tech': { name: '科技旅行家', emoji: '🚀', description: '你的旅行充满了科技感，探索世界与科技的边界。' },
    'beauty,beauty': { name: '纯正好色党', emoji: '😍', description: '在这个看脸的世界，你活得最真实。' },
    'ootd,ootd': { name: '纯正时尚党', emoji: '👠', description: '穿搭是你的信仰，时尚是你的灵魂。' },
    'news,news': { name: '纯正时事党', emoji: '📺', description: '家事国事天下事，事事关心。你是真正的社会观察者。' },
    'cute,cute': { name: '纯正吸宠党', emoji: '🐈', description: '没有什么是云吸一只猫解决不了的，如果有，就两只。' },
    'food,food': { name: '纯正干饭人', emoji: '🍽️', description: '你的人生格言：要么吃，要么在去吃的路上。' },
    'tech,tech': { name: '纯正科技党', emoji: '💻', description: '代码是你的诗，参数是你的远方。' },
    'funny,funny': { name: '纯正乐子人', emoji: '🎉', description: '你的存在就是为了给世界带来快乐。' },
    'travel,travel': { name: '纯正旅行家', emoji: '🌍', description: '世界那么大，你一直在路上。' },
  };

  const key1 = top.join(',');
  const key2 = `${top[1]},${top[0]}`;
  return typeMap[key1] || typeMap[key2] || { name: '均衡刷手', emoji: '🎯', description: '你的爱好分布均匀，是个全面发展的互联网冲浪选手。' };
}

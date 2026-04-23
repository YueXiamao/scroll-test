export interface ScoreType {
  beauty: number;
  ootd: number;
  news: number;
  cute: number;
  food: number;
  tech: number;
  funny: number;
  travel: number;
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
    text: "刷到一条视频，你通常能看完整条的原因是？",
    options: [
      { text: "画面让人眼前一亮，忍不住多看两眼", scores: { beauty: 2, ootd: 1, news: 0, cute: 1, food: 0, tech: 1, funny: 0, travel: 0 } },
      { text: "开头就猜到了结尾，但评论比视频有意思", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 1, funny: 3, travel: 0 } },
      { text: "发现了一些之前没注意到的细节", scores: { beauty: 1, ootd: 1, news: 0, cute: 1, food: 1, tech: 2, funny: 0, travel: 1 } },
      { text: "UP主的表达方式很特别，声音好听", scores: { beauty: 1, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 2, travel: 0 } },
      { text: "刚好无聊，随便刷刷打发时间", scores: { beauty: 1, ootd: 0, news: 1, cute: 2, food: 1, tech: 0, funny: 1, travel: 0 } },
    ]
  },
  {
    text: "你更愿意为什么样的内容创作者付费？",
    options: [
      { text: "那个教你真正有用东西的", scores: { beauty: 0, ootd: 1, news: 0, cute: 1, food: 2, tech: 2, funny: 0, travel: 1 } },
      { text: "那个让你笑出声的", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "那个让你觉得自己也在现场的", scores: { beauty: 1, ootd: 1, news: 1, cute: 0, food: 1, tech: 0, funny: 0, travel: 2 } },
      { text: "那个让你感受到被理解的", scores: { beauty: 1, ootd: 0, news: 1, cute: 2, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "那个让你看到另一种生活的", scores: { beauty: 1, ootd: 2, news: 0, cute: 1, food: 1, tech: 0, funny: 0, travel: 2 } },
    ]
  },
  {
    text: "你和朋友聊天，最常聊起的话题是？",
    options: [
      { text: "最近网上又发生了什么大事", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "某某店新出了个什么东西，拍照很出片", scores: { beauty: 1, ootd: 2, news: 0, cute: 0, food: 2, tech: 0, funny: 0, travel: 1 } },
      { text: "最近挖到了一个超好笑的博主", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "谁谁谁家的猫/狗太可爱了", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "最近有什么值得买的，推荐一下", scores: { beauty: 1, ootd: 2, news: 0, cute: 0, food: 2, tech: 1, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你给一个视频点赞，通常是因为？",
    options: [
      { text: "看完之后心情变好了", scores: { beauty: 1, ootd: 0, news: 0, cute: 1, food: 1, tech: 0, funny: 2, travel: 0 } },
      { text: "觉得创作者很用心，值得支持", scores: { beauty: 0, ootd: 1, news: 1, cute: 1, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "内容对自己确实有帮助", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 1, tech: 2, funny: 0, travel: 1 } },
      { text: "收藏了以后可能用得上", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 2, tech: 2, funny: 0, travel: 0 } },
      { text: "单纯觉得创作者长得很有记忆点", scores: { beauty: 2, ootd: 1, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你一般在什么时候刷手机最多？",
    options: [
      { text: "睡前，总觉得还能再刷五分钟", scores: { beauty: 2, ootd: 1, news: 1, cute: 1, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "通勤路上，地铁里太无聊了", scores: { beauty: 1, ootd: 1, news: 2, cute: 1, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "吃饭的时候，没有下饭视频吃不下饭", scores: { beauty: 1, ootd: 0, news: 0, cute: 1, food: 3, tech: 0, funny: 1, travel: 0 } },
      { text: "周末午后，一刷就是一下午", scores: { beauty: 1, ootd: 1, news: 1, cute: 2, food: 1, tech: 0, funny: 1, travel: 1 } },
      { text: "工作间隙摸鱼的时候", scores: { beauty: 0, ootd: 1, news: 2, cute: 0, food: 0, tech: 2, funny: 2, travel: 0 } },
    ]
  },
  {
    text: "你更倾向于关注什么样的博主？",
    options: [
      { text: "内容有深度，能引发思考的", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 2, funny: 0, travel: 1 } },
      { text: "风格独特，看着很享受的", scores: { beauty: 2, ootd: 2, news: 0, cute: 1, food: 0, tech: 0, funny: 0, travel: 1 } },
      { text: "真实接地气，像朋友一样的", scores: { beauty: 1, ootd: 1, news: 0, cute: 2, food: 1, tech: 0, funny: 2, travel: 0 } },
      { text: "信息量大，干货多的", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 1, tech: 3, funny: 0, travel: 0 } },
      { text: "总能发现新地方的", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 0, funny: 0, travel: 3 } },
    ]
  },
  {
    text: "你看视频时最在意的是什么？",
    options: [
      { text: "节奏感，不能太拖沓", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 0, tech: 0, funny: 2, travel: 0 } },
      { text: "信息准确，值得信赖", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 2, funny: 0, travel: 0 } },
      { text: "画面和声音的质感", scores: { beauty: 2, ootd: 1, news: 0, cute: 0, food: 1, tech: 1, funny: 0, travel: 1 } },
      { text: "能不能让我放松下来", scores: { beauty: 1, ootd: 0, news: 0, cute: 2, food: 1, tech: 0, funny: 1, travel: 0 } },
      { text: "有没有让我觉得'原来还能这样'的点", scores: { beauty: 0, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 1, travel: 1 } },
    ]
  },
  {
    text: "如果只能留下一个类型的视频，你会选？",
    options: [
      { text: "能让我开心笑起来的", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "能让我学到新东西的", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 1, tech: 2, funny: 0, travel: 1 } },
      { text: "能让我看到更大世界的", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 1, funny: 0, travel: 3 } },
      { text: "能治愈我一天的疲惫的", scores: { beauty: 1, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "能解决我实际问题的", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 2, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你更愿意把视频分享给谁？",
    options: [
      { text: "分享给可能有需要的朋友", scores: { beauty: 0, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 1, travel: 0 } },
      { text: "分享到朋友圈等大家一起讨论", scores: { beauty: 1, ootd: 2, news: 2, cute: 0, food: 1, tech: 0, funny: 1, travel: 0 } },
      { text: "私发给关系最好的朋友一起看", scores: { beauty: 1, ootd: 0, news: 1, cute: 2, food: 1, tech: 0, funny: 1, travel: 0 } },
      { text: "一般不分享，自己看就够了", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 0, tech: 2, funny: 1, travel: 0 } },
      { text: "分享给有共同爱好的人群", scores: { beauty: 0, ootd: 1, news: 0, cute: 1, food: 2, tech: 1, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你刷到明显是广告的视频，通常会？",
    options: [
      { text: "只要有意思，广告也看完", scores: { beauty: 2, ootd: 1, news: 0, cute: 0, food: 1, tech: 1, funny: 1, travel: 0 } },
      { text: "快速划过，浪费时间", scores: { beauty: 0, ootd: 0, news: 1, cute: 1, food: 0, tech: 1, funny: 2, travel: 0 } },
      { text: "看看有没有自己需要的", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 1, funny: 0, travel: 0 } },
      { text: "反正都要刷到，当背景音", scores: { beauty: 1, ootd: 1, news: 1, cute: 2, food: 1, tech: 0, funny: 1, travel: 0 } },
      { text: "划走，不喜欢被营销", scores: { beauty: 0, ootd: 1, news: 2, cute: 0, food: 0, tech: 2, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "你觉得自己在网上属于哪种人？",
    options: [
      { text: "什么都看，什么都感兴趣", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 1, travel: 1 } },
      { text: "目标明确，只看自己感兴趣的", scores: { beauty: 2, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 0, travel: 0 } },
      { text: "资讯型，什么都想第一时间知道", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 2, funny: 0, travel: 0 } },
      { text: "社交型，喜欢在评论区聊天", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 0, tech: 0, funny: 2, travel: 1 } },
      { text: "收藏型，点赞收藏一大把", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "什么样的视频你会重复看很多遍？",
    options: [
      { text: "能让我每次都笑出来的", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "能给我带来实用价值的", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 2, funny: 0, travel: 1 } },
      { text: "能让我沉浸其中忘记烦恼的", scores: { beauty: 2, ootd: 1, news: 0, cute: 1, food: 1, tech: 0, funny: 0, travel: 1 } },
      { text: "看很多遍才能理解其中深意的", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 2, funny: 1, travel: 0 } },
      { text: "每次看都有新发现的", scores: { beauty: 1, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你更关注博主本人的什么特质？",
    options: [
      { text: "有才华，内容质量稳定", scores: { beauty: 0, ootd: 1, news: 1, cute: 1, food: 1, tech: 1, funny: 1, travel: 0 } },
      { text: "有个性，有自己的风格", scores: { beauty: 2, ootd: 1, news: 1, cute: 0, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "真实，不装", scores: { beauty: 1, ootd: 1, news: 0, cute: 2, food: 1, tech: 0, funny: 2, travel: 0 } },
      { text: "专业，说的话有参考价值", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 1, tech: 2, funny: 0, travel: 1 } },
      { text: "审美在线，看着舒服", scores: { beauty: 2, ootd: 2, news: 0, cute: 0, food: 1, tech: 0, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "如果要去一个陌生城市，你通常会提前做什么准备？",
    options: [
      { text: "刷大量攻略视频，了解必去的地方", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 0, funny: 0, travel: 3 } },
      { text: "关注当地的新闻和动态", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 0, travel: 1 } },
      { text: "看看当地有什么好吃的", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 3, tech: 0, funny: 0, travel: 1 } },
      { text: "随便逛，走到哪算哪", scores: { beauty: 1, ootd: 0, news: 0, cute: 1, food: 1, tech: 0, funny: 2, travel: 2 } },
      { text: "搜搜有什么新鲜科技体验", scores: { beauty: 0, ootd: 0, news: 0, cute: 0, food: 0, tech: 3, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你买过最满意的线上推荐是？",
    options: [
      { text: "一件让自己更好看的衣服", scores: { beauty: 1, ootd: 3, news: 0, cute: 0, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "一件用了很久的生活好物", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 1, tech: 2, funny: 0, travel: 0 } },
      { text: "一份吃了还想吃的零食", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 3, tech: 0, funny: 0, travel: 0 } },
      { text: "一件宠物用品，主子很喜欢", scores: { beauty: 0, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 0, travel: 0 } },
      { text: "一个解锁了新爱好的东西", scores: { beauty: 0, ootd: 1, news: 1, cute: 1, food: 0, tech: 2, funny: 1, travel: 1 } },
    ]
  },
  {
    text: "你认为好的内容最重要的标准是？",
    options: [
      { text: "让人看着心情好，赏心悦目", scores: { beauty: 2, ootd: 1, news: 0, cute: 1, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "能引发讨论，有观点碰撞", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 1, travel: 0 } },
      { text: "能让人会心一笑或开怀大笑", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "真实不做作，有共鸣", scores: { beauty: 1, ootd: 0, news: 0, cute: 2, food: 1, tech: 0, funny: 2, travel: 0 } },
      { text: "有营养，值得反复品味", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 1, tech: 2, funny: 0, travel: 1 } },
    ]
  },
  {
    text: "你更喜欢什么样的内容风格？",
    options: [
      { text: "精致、有质感的", scores: { beauty: 2, ootd: 2, news: 0, cute: 0, food: 1, tech: 0, funny: 0, travel: 1 } },
      { text: "轻松搞笑的下饭必备", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 2, tech: 0, funny: 2, travel: 0 } },
      { text: "深度分析类，开阔视野", scores: { beauty: 0, ootd: 0, news: 3, cute: 0, food: 0, tech: 1, funny: 0, travel: 1 } },
      { text: "萌系可爱风，治愈解压", scores: { beauty: 1, ootd: 0, news: 0, cute: 3, food: 0, tech: 0, funny: 1, travel: 0 } },
      { text: "实用主义，干货分享", scores: { beauty: 0, ootd: 1, news: 0, cute: 0, food: 2, tech: 2, funny: 0, travel: 0 } },
    ]
  },
  {
    text: "如果只能保留三个视频，你会留哪三个？",
    options: [
      { text: "一个能让我笑起来的", scores: { beauty: 0, ootd: 0, news: 0, cute: 1, food: 0, tech: 0, funny: 3, travel: 0 } },
      { text: "一个能让我学到东西的", scores: { beauty: 0, ootd: 1, news: 1, cute: 0, food: 1, tech: 2, funny: 0, travel: 0 } },
      { text: "一个能让我放松的", scores: { beauty: 1, ootd: 0, news: 0, cute: 2, food: 1, tech: 0, funny: 1, travel: 0 } },
      { text: "一个让我看到更大世界的", scores: { beauty: 0, ootd: 0, news: 2, cute: 0, food: 0, tech: 1, funny: 0, travel: 2 } },
      { text: "一个记录了美好瞬间的", scores: { beauty: 2, ootd: 1, news: 0, cute: 1, food: 0, tech: 0, funny: 0, travel: 2 } },
    ]
  },
];

let video;
let handPose;
let hands = [];

// --- 教學文案資料庫 ---
const levelData = [
  {
    title: "🩹 第一關：一般擦傷",
    concept: "📌 關卡與傷口：一般擦傷（沙子殘留與輕微滲血）",
    pages: [
      { 
        action: "1. 清潔的核心原理", 
        conceptText: "當傷口沾染沙子時，<b>絕對不可直接用手或乾布擦拭</b>，否則粗糙的沙粒會二次刮傷肉芽組織。必須使用<b>大量流動的清水沖洗</b>，利用水流的機械力量將沙子帶走，這是預防傷口化膿與感染最關鍵的第一步。",
        gesture: "水流沖洗", 
        text: "請將<b>手掌完全張開</b>，在畫面的水龍頭與傷口之間來回揮動，模擬用流動的清水將傷口上的沙子與髒污徹底沖洗乾淨。" 
      },
      { 
        action: "2. 消毒的正確方向", 
        conceptText: "使用生理食鹽水或優碘消毒時，必須採取<b>「由內向外」的同心圓方式</b>擦拭。如果來回塗抹，會把傷口周圍皮膚的常駐細菌再次帶回微血管破裂的中央核心，反而擴大感染風險。",
        gesture: "由內向外消毒", 
        text: "請用<b>兩指捏合</b>夾起模擬棉球，對準傷口中心點，以<b>「由內向外」的同心圓方式</b>打圈擦拭消毒。切記<b>不要來回塗抹</b>。" 
      },
      { 
        action: "3. 敷藥與保護", 
        conceptText: "塗抹消炎藥膏（抗生素藥膏）能<b>維持傷口微濕潤環境</b>，加速上皮細胞爬行修復。隨後<b>覆蓋乾淨紗布</b>，是為了阻絕空氣中的微塵與細菌，避免衣服摩擦造成結痂反覆破裂。",
        gesture: "塗抹藥膏", 
        text: "請<b>伸出食指</b>模擬棉籤，在傷口紅腫處輕輕點塗，為傷口塗上一層薄薄的消炎藥膏，隨後畫面將會自動覆蓋上乾淨紗布。" 
      },
      { 
        action: "4. 網繃固定", 
        conceptText: "固定敷料是保護傷口的最後一步，能<b>防止紗布脫落並提供適度壓迫</b>，避免組織液過度滲出與遭受二次傷害。",
        gesture: "網繃固定", 
        text: "請<b>握緊拳頭</b>模擬手持捲軸繃帶，圍繞著傷口周圍<b>順時針繞圈</b>，將紗布緊密固定，保護受傷部位。" 
      }
    ]
  },
  {
    title: "♨️ 第二關：輕度燙傷",
    concept: "📌 關卡與傷口：輕度燙傷（皮膚發紅與輕微水泡）",
    pages: [
      { 
        action: "1. 熱能殘留擴散", 
        conceptText: "熱水或熱油潑濺到皮膚後，熱能會殘留在皮下組織繼續「悶燒」並向深層擴散。此時必須立刻用 <b>15~20 度的流動冷水持續浸泡或沖洗</b>，迫使微血管收縮、<b>阻斷熱能向真皮層蔓延</b>，這是減輕日後留疤的關鍵。",
        gesture: "持續降溫", 
        text: "燙傷發生的黃金時間，請將<b>雙手手掌張開</b>，放入畫面中的冷水盆區域<b>保持靜止不動 5 秒</b>（現實中需持續沖泡 15-30 分鐘），徹底帶走皮下殘留的熱能。" 
      },
      { 
        action: "2. 衣物粘黏危機", 
        conceptText: "當燙傷部位覆蓋有衣物時，<b>絕對不能強行扯下</b>，因為高溫可能已讓衣物纖維與表皮組織融黏。若用力拉扯會直接撕裂表皮。正確做法是<b>在水中一邊浸泡降溫</b>，一邊用<b>剪刀小心剪開衣物</b>。",
        gesture: "剪開衣物", 
        text: "請用<b>兩指做捏合動作</b>，順着衣物邊緣<b>「極其緩慢」地往外拖曳</b>，模擬用剪刀剪開覆蓋在傷口上的衣物，避免撕扯到脆弱的燙傷表皮。" 
      },
      { 
        action: "3. 水泡的無菌屏障", 
        conceptText: "燙傷產生的水泡組織液是身體<b>天然的無菌保護膜</b>。在未受專業醫療評估前<b>絕對不可弄破</b>。一旦水泡破裂，失去表皮保護的真皮層直接暴露，會成為細菌繁殖的溫床。",
        gesture: "覆蓋保護", 
        text: "請將<b>雙手手掌平平地向前推</b>，模擬將不沾黏的乾淨紗布平整、輕柔地覆蓋在水泡上，<b>絕對不要用力按壓</b>，以免弄破水泡。" 
      }
    ]
  },
  {
    title: "🦶 第三關：急性扭傷",
    concept: "📌 關卡與傷口：急性扭傷（關節韌帶拉傷與急性腫脹）",
    pages: [
      { 
        action: "1. 內出血與冰敷原理", 
        conceptText: "扭傷（俗稱翻船）的瞬間，關節周圍的韌帶與微血管會發生撕裂傷。急性期（24-48小時內）患處會因內出血而劇烈腫脹。此時<b>冰敷能使局部血管收縮、減少出血量</b>，並麻痺神經以達到止痛效果。",
        gesture: "間歇冰敷", 
        text: "請<b>握緊拳頭</b>模擬冰袋，對準紅腫的關節處<b>定點按壓</b>，在畫面上停留 3 秒後放開，重複三次。透過間歇性冰敷來收縮微血管。" 
      },
      { 
        action: "2. 八字包紮的支撐力", 
        conceptText: "急性扭傷後，受損的關節失去了原本韌帶的穩定度。使用彈性繃帶進行<b>「八字形纏繞包紮」</b>，能<b>提供外在的物理支撐力</b>，限制關節產生不正常的左右晃動，預防二次韌帶撕裂。",
        gesture: "八字加壓支撐", 
        text: "請<b>雙手握拳</b>，在關節周圍交替上下揮動，模擬使用彈性繃帶以<b>「八字形法」緊密纏繞</b>腳踝，為受損的關節建立穩固的支撐防護。" 
      },
      { 
        action: "3. 重力與血液回流", 
        conceptText: "受傷的肢體如果一直垂放，血液與組織液會因為重力大量淤積在最底端，導致腫脹加劇。將患處<b>抬高並超過心臟高度</b>，能利用物理重力引流，<b>促進靜脈血液順暢回流</b>，有效緩減局部腫脹。",
        gesture: "重力抬高", 
        text: "請將<b>手掌朝上，緩慢地向上抬起</b>，這代表在現實中用枕頭或墊子把受傷的腳墊高，使其<b>高度超過心臟</b>，幫助血液回流、消除腫脹。" 
      }
    ]
  },
  {
    title: "🪵 第四關：異物刺傷",
    concept: "📌 關卡與傷口：異物刺傷（微小木屑或玻璃扎入皮膚）",
    pages: [
      { 
        action: "1. 順向拔除的力學", 
        conceptText: "木屑或玻璃扎入皮膚時是有<b>特定角度</b>的。如果<b>盲目垂直硬拔</b>、或者抓取角度歪斜，脆弱的木屑極易在皮下直接折斷，導致殘留碎屑留在真皮層中，引發嚴重的異物肉芽腫或蜂窩性組織炎。",
        gesture: "順向夾取", 
        text: "請用<b>兩指捏合</b>夾住木屑尾端，向外拉出即可模擬<b>順向拔除</b>異物。" 
      },
      { 
        action: "2. 嚴禁盲目擠壓", 
        conceptText: "很多人在扎到木屑時會下意識用力擠壓傷口周圍。這個動作非常危險，因為手指施加的向內壓力，極有可能<b>將尚未拔出的異物推得更深</b>，甚至刺破更深層的血管或神經。",
        gesture: "局部加壓止血", 
        text: "異物順利拔出後，請<b>豎起大拇指</b>對準鏡頭，在傷口判定區<b>用力按壓 3 秒鐘</b>。這是模擬用乾淨棉球進行<b>局部直接加壓</b>，讓受損的微血管快速凝血。" 
      }
    ]
  },
  {
    title: "🩸 第五關：猛烈流鼻血",
    concept: "📌 關卡與傷口：猛烈流鼻血（鼻黏膜微血管破裂）",
    pages: [
      { 
        action: "1. 頭部後仰的窒息危機", 
        conceptText: "傳統觀念認為流鼻血要將頭往後仰，這是<b>完全錯誤且致命的</b>。頭後仰並不能止血，反而會使鼻血沿著後鼻孔流向咽喉。這可能導致血液吞入胃部引發劇烈嘔吐，更嚴重者會<b>誤入氣管導致窒息或吸入性肺炎</b>。",
        gesture: "引導低頭姿勢", 
        text: "請將<b>雙手張開平放在下巴下方，隨後緩慢向下移動</b>，引導畫面中的角色將頭部<b>向前傾、微微低頭</b>，確保鼻血順暢流出，不會倒流進喉嚨。" 
      },
      { 
        action: "2. 直接壓迫鼻翼", 
        conceptText: "流鼻血最常見的出血點位於鼻中膈前下方的「李氏區（Kiesselbach's plexus）」，該處微血管密集成網。正確止血法是<b>直接用手指施壓於兩側軟骨處（鼻翼）</b>，直接對出血點進行物理加壓。",
        gesture: "直接加壓止血", 
        text: "請在畫面中央的鼻子區域做出<b>捏緊的手勢</b>，保持不動 5 秒鐘（現實中需持續捏住10分鐘）。此時請提醒自己<b>改用嘴巴進行呼吸</b>。" 
      }
    ]
  },
  {
    title: "🐝 第六關：昆蟲螫傷",
    concept: "📌 關卡與傷口：蜜蜂螫傷（蜂針殘留與毒液釋放）",
    pages: [
      { 
        action: "1. 毒囊的二次注射", 
        conceptText: "蜜蜂螫人後，殘留在皮膚上的蜂針後端連接著一個「活體毒囊」。如果此時<b>直接用手指或鑷子去捏拔</b>蜂針，外力擠壓會如同按壓針筒一般，將毒囊內殘留的全部毒液<b>瞬間一次性注入皮下</b>，加劇中毒症狀。",
        gesture: "卡片平刮蜂針", 
        text: "<b>絕對不要用捏的！</b>請將<b>手掌繃緊、指尖朝上</b>化身為硬卡片，貼近畫面中的傷口表面，由左向右<b>橫向平平地刮過去</b>，將蜂針與連帶的毒囊安全剔除。" 
      },
      { 
        action: "2. 硬卡片刮除法與冷敷", 
        conceptText: "面對殘留的蜂針，正確做法是使用<b>具備硬度的邊緣</b>（如健保卡、信用卡），貼緊皮膚表面，採用<b>「橫向平刮」</b>的方式。移除蜂針後敷上冰袋可減緩毒液吸收速度並舒緩紅腫。",
        gesture: "冷敷舒緩減毒", 
        text: "蜂針移除了！請<b>雙手握拳</b>，在紅腫的患處上方連續做<b>向下輕點</b>的動作。這代表在現實中為傷口<b>敷上冰袋</b>，利用低溫減緩局部血液循環，降低毒液在體內的擴散速度。" 
      }
    ]
  }
];

// UI 狀態變數
let currentLevel = -1;
let currentPage = 0;
let isPopupOpen = false;

// --- 應用程式狀態 ---
let currentMode = "TEACHING"; // "TEACHING", "PRACTICE" 或 "RUNNING_GAME"

// --- 奔跑答題小遊戲變數 ---
let runner = {
  lane: 1, // 0: 左跑道, 1: 中跑道, 2: 右跑道
  x: 0,
  y: 0,
  isFainting: false,
  faintTimer: 0
};
let runGame = {
  currentQIndex: 0,
  timeLeft: 10,
  lastTime: 0,
  laneCharge: [0, 0, 0],
  state: "PLAYING", // "PLAYING", "CORRECT_DELAY", "GAME_WON"
  score: 0,
  flashGreen: 0,
  flashRed: 0,
  explanation: "",
  delayStart: 0,
  selectedQuestions: [] // 儲存每次隨機抽出的 6 題
};
let gestureHistory = [];
const GESTURE_FRAMES = 5; // 防手抖的影格數量

// --- 題庫資料庫 (共18題) ---
const RUNNING_QUESTIONS = [
  {
    q: "跌倒擦傷且傷口沾滿沙子時，第一步該怎麼處理？",
    options: ["拿乾淨的衛生紙用力把沙子擦掉", "使用大量流動的清水沖洗傷口", "立刻用優碘塗抹在沙子上進行消毒"],
    ans: 1,
    exp: "使用大量流動的清水沖洗，利用水流的機械力量將沙子帶走，這是預防傷口化膿與感染最關鍵的第一步。"
  },
  {
    q: "棉球沾取優碘為傷口消毒時，怎樣的擦拭方向才正確？",
    options: ["由傷口中心點向外圈畫同心圓", "由外圈往傷口中心來回塗抹", "只要有塗到就好，方向無所謂"],
    ans: 0,
    exp: "必須採取「由內向外」的同心圓方式擦拭，避免把外圍細菌帶回傷口中心。"
  },
  {
    q: "在擦傷表面塗抹消炎藥膏的核心目的是？",
    options: ["讓傷口乾涸結痂", "腐蝕壞死的皮膚組織", "維持微濕潤環境加速上皮細胞修復"],
    ans: 2,
    exp: "塗抹消炎藥膏能維持傷口微濕潤環境，加速上皮細胞爬行修復。"
  },
  {
    q: "被熱水燙到要立刻沖冷水，最核心的醫療原理是？",
    options: ["迫使微血管收縮，阻斷皮下熱能蔓延", "把皮膚表面的熱水洗乾淨", "讓紅腫的皮膚變白"],
    ans: 0,
    exp: "熱能會殘留皮下蔓延，沖冷水可使微血管收縮、阻斷熱能擴散。"
  },
  {
    q: "燙傷部位黏著衣服時，應該如何正確移除？",
    options: ["趁皮膚還沒腫脹前快速扯下", "塗抹牙膏讓衣服滑落", "在水中降溫並用剪刀小心剪開衣物"],
    ans: 2,
    exp: "用力拉扯會直接撕裂表皮，應在水中降溫並小心剪開。"
  },
  {
    q: "發現燙傷處起了一個小水泡，此時該怎麼辦？",
    options: ["拿針戳破，把組織液擠乾淨", "輕覆紗布保護，絕對不可弄破水泡", "用力揉搓水泡讓皮膚平整"],
    ans: 1,
    exp: "水泡是天然無菌保護膜，弄破會成為細菌繁殖的溫床。"
  },
  {
    q: "腳踝扭傷急性期（24-48小時內）進行冰敷的目的是？",
    options: ["促進血液循環讓瘀血退散", "使局部血管收縮，減少內出血與腫脹", "加熱韌帶組織，加速肌肉放鬆"],
    ans: 1,
    exp: "冰敷能使局部血管收縮、減少出血量，並達到止痛效果。"
  },
  {
    q: "扭傷後使用彈性繃帶進行『八字形纏繞』是為了？",
    options: ["提供物理支撐力，限制異常晃動", "阻止血液流向腳尖", "只是為了美觀和保暖"],
    ans: 0,
    exp: "「八字形纏繞」能提供物理支撐力，防止關節不正常晃動。"
  },
  {
    q: "扭傷後為了防止組織液與血液淤積在腳踝，該怎麼做？",
    options: ["保持站立姿勢一直走路", "將患處抬高，使其高度超過心臟", "用熱水泡腳並用力揉捏"],
    ans: 1,
    exp: "抬高患處能利用物理重力引流，促進靜脈血液順暢回流，消除腫脹。"
  },
  {
    q: "當小木屑斜斜地扎進手指時，應該怎麼拔除？",
    options: ["順著刺入的傾斜角度直線向外拉", "垂直 90 度直接用力往上拔", "左右搖晃木屑，把它甩出來"],
    ans: 0,
    exp: "盲目垂直硬拔會導致碎屑折斷殘留，應順著原角度拔除。"
  },
  {
    q: "扎到木屑時，為什麼絕對不能盲目用力擠壓傷口周圍？",
    options: ["會讓木屑變成粉末", "外力會把異物推得更深刺傷神經", "會讓手指的骨頭受傷"],
    ans: 1,
    exp: "向內擠壓極可能將異物推得更深，甚至刺破深層血管或神經。"
  },
  {
    q: "成功用鑷子拔出木屑後，下一步該怎麼做？",
    options: ["瘋狂甩手把髒血甩掉", "用乾淨棉球在傷口定點加壓止血", "立刻用膠帶把傷口封死"],
    ans: 1,
    exp: "異物拔出後應立刻用乾淨棉球進行局部直接加壓，快速凝血。"
  },
  {
    q: "猛烈流鼻血時，正確的頭部姿勢應該是？",
    options: ["頭往後仰，這樣血才不會流出來", "躺下來平躺休息", "身體前傾、微微低頭"],
    ans: 2,
    exp: "頭後仰會使鼻血流向咽喉，應微微低頭讓血液順暢流出。"
  },
  {
    q: "流鼻血時如果將頭後仰，最可能發生什麼危險？",
    options: ["導致鼻樑變形", "血液倒流進氣管，引發窒息或肺炎", "血液會逆流回大腦導致中風"],
    ans: 1,
    exp: "鼻血沿著後鼻孔流向咽喉，易導致血液誤入氣管引發窒息。"
  },
  {
    q: "流鼻血時，應該按壓哪一個部位才能物理加壓止血？",
    options: ["用力按壓兩側山根（雙眼之間）", "用手指直接捏住兩側軟骨處(鼻翼)", "拍打後腦勺"],
    ans: 1,
    exp: "直接用手指捏住兩側鼻翼，直接對出血點（李氏區）進行物理加壓。"
  },
  {
    q: "被蜜蜂螫傷皮膚殘留蜂針時，為什麼不能用手指去捏拔？",
    options: ["手指的細菌會讓蜂針融化", "會擠壓到活體毒囊注入更多毒液", "蜂針會刺穿手指"],
    ans: 1,
    exp: "用手指捏拔會如同按壓針筒一般，將毒囊殘留的毒液瞬間注入皮下。"
  },
  {
    q: "面對皮膚上殘留的蜂針與毒囊，最安全的移除工具是？",
    options: ["使用硬卡片貼著皮膚表面平刮", "用尖頭的小剪刀去剪", "用膠帶大力撕扯"],
    ans: 0,
    exp: "使用具備硬度的卡片，貼緊皮膚橫向平刮，可安全剔除蜂針。"
  },
  {
    q: "安全移除了蜂針與毒囊後，該如何舒緩紅腫發癢？",
    options: ["用熱毛巾熱敷，加速毒液吸收", "用力抓癢，把毒素抓出來", "敷上冰袋利用低溫減緩毒液擴散"],
    ans: 2,
    exp: "移除蜂針後敷上冰袋可減緩毒液吸收速度並舒緩紅腫。"
  }
];

// --- 實戰演練變數 ---
let practiceScenario = -1;
let practiceTimeLeft = 30;
let practiceTimer = null;
let practiceStep = 0;
let practiceStatus = "PLAYING"; 
let flashRed = 0;
let penaltyCooldown = 0;
let fireworks = [];
let playedScenarios = []; // 紀錄已經玩過的關卡，達成成就用
let practiceProgress = 0; // 進度條百分比 (0~100)
let stepCompleteDelay = 0; // 步驟完成後的文字停留延遲計時
let prePracticeStuckTimer = 0; // 測前練習卡關計時器
let isAngleWrong = false; // 紀錄異物刺傷的拔除角度是否歪掉
let isPracticeCompleted = false; // 實戰演練是否完成
let isRunningCompleted = false; // 奔跑小人是否完成
let isRunningPerfect = false; // 奔跑小人是否全對

// --- 實戰演練進階變數 ---
let stepReady = true; // 防跳格鎖，確保每個步驟間有過渡延遲

const PRACTICE_SCENARIOS = [
  { name: "一般擦傷", tasks: ["手掌張開左右揮動 (清潔)", "兩指捏合畫圓移動 (消毒)", "食指單指伸出定點 (塗藥)", "單手握拳繞圈移動 (固定)"], gestures: ["OpenHand", "Pinch", "Point", "Fist"] },
  { name: "輕度燙傷", tasks: ["雙手手掌張開保持靜止 (降溫)", "兩指捏合緩慢往外拉 (脫衣)", "雙手手掌朝前平推 (覆蓋)"], gestures: ["OpenHand", "Pinch", "OpenHand"] },
  { name: "急性扭傷", tasks: ["單手握拳定點按壓 (冰敷)", "雙手握拳交替上下移動 (包紮)", "手掌朝上由下往上移 (抬高)"], gestures: ["Fist", "Fist", "OpenHand"] },
  { name: "異物刺傷", tasks: ["兩指捏合向外拉 (夾取)", "大拇指比讚定點按壓 (加壓)"], gestures: ["Pinch", "ThumbsUp"] },
  { name: "猛烈流鼻血", tasks: ["雙手手掌向下平移 (低頭)", "單手捏合維持中心 (捏鼻)"], gestures: ["OpenHand", "Pinch"] },
  { name: "昆蟲螫傷", tasks: ["手掌平直橫向刷過去 (刮除)", "雙手握拳連續上下輕點 (冷敷)"], gestures: ["OpenHand", "Fist"] }
];

// --- 視覺提示手勢資料庫 ---
const GESTURE_EMOJIS = {
  "OpenHand": "✋ (手掌張開)",
  "Pinch": "🤏 (兩指捏合)",
  "Point": "☝️ (伸出食指)",
  "Fist": "✊ (握緊拳頭)",
  "ThumbsUp": "👍 (豎起大拇指)"
};

// 手勢防連續觸發計時器
let gestureCooldown = 0;
let currentLeftGesture = "";
let currentRightGesture = "";

// --- 教學模式進度條變數 ---
let tutorialAction = "";
let tutorialProgress = 0;

function setup() {
  // 將畫布放入指定的容器中
  let canvas = createCanvas(windowWidth * 0.7, windowHeight * 0.8); 
  canvas.parent('canvas-container');
  
  video = createCapture(VIDEO); // 取得攝影機影像
  video.hide(); 
  
  // 啟動手部辨識模型，並在「模型背景載入完成後」才開始擷取手勢
  handPose = ml5.handPose(function() {
    console.log("手部辨識模型載入完成！");
    handPose.detectStart(video, gotHands);
  });

  // 初始化按鈕文字
  let btnJumper = document.getElementById('btn-jumper');
  if (btnJumper) btnJumper.innerText = '奔跑小人';
  
  runner.x = width / 2;
  runner.y = height - 120;
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background('#e0f7fa'); // 繪製淡藍色背景
  
  // 檢查鏡頭是否載入完成，若尚未載入，顯示提示文字並暫停後續的遊戲邏輯
  if (!video || !video.loadedmetadata || video.width === 0 || video.height === 0) {
    fill(0, 120, 180);
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text("鏡頭載入中...", width / 2, height / 2);
    return;
  }

  imageMode(CENTER); // 設定影像對齊模式為「中心點對齊」
  
  push(); // 儲存目前的座標系統設定
  translate(width, 0); // 將原點移至畫面右側
  scale(-1, 1); // 水平翻轉 X 軸，達成照鏡子的效果
  // 調整影片大小填滿畫布高度
  image(video, width / 2, height / 2, height * (video.width/video.height), height); 
  pop(); // 恢復先前的座標系統設定
  
  // 重置手勢狀態
  currentLeftGesture = "";
  currentRightGesture = "";
  let currentGestures = [];

  // 繪製辨識出的手部節點與連線
  if (video.width > 0) {
    // 定義手部骨架連線的節點對應
    let connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // 大拇指
      [5, 6], [6, 7], [7, 8],       // 食指
      [9, 10], [10, 11], [11, 12],  // 中指
      [13, 14], [14, 15], [15, 16], // 無名指
      [17, 18], [18, 19], [19, 20]  // 小拇指
    ];

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      let handColor = hand.handedness === "Left" ? "red" : "blue";
      let isLeftPhysical = hand.handedness === "Left"; // ml5 返回的真實左右手
      
      // 取得手勢
      let posture = getHandPosture(hand);
      currentGestures.push(posture);
      
      // 偵測是否為 OK 手勢
      let isOK = (posture === "OK");
      if (isOK) {
        // 因為鏡像翻轉，畫面的左側通常是物理右手，畫面右側是物理左手
        // 這裡為了直覺：畫面左邊的手=左手，畫面右邊的手=右手
        let handCenterX = hand.keypoints[0].x;
        if (handCenterX > video.width / 2) {
          currentLeftGesture = "OK"; // 畫面左側
        } else {
          currentRightGesture = "OK"; // 畫面右側
        }
      }

      // 畫骨架連線
      stroke(handColor);
      strokeWeight(4);
      for (let j = 0; j < connections.length; j++) {
        let pointA = hand.keypoints[connections[j][0]];
        let pointB = hand.keypoints[connections[j][1]];
        
        // 影像滿版映射計算
        let imgW = height * (video.width/video.height);
        let imgH = height;
        let oX = (width - imgW) / 2;
        let oY = 0;

        let ax = width - (oX + map(pointA.x, 0, video.width, 0, imgW));
        let ay = oY + map(pointA.y, 0, video.height, 0, imgH);
        let bx = width - (oX + map(pointB.x, 0, video.width, 0, imgW));
        let by = oY + map(pointB.y, 0, video.height, 0, imgH);
        
        line(ax, ay, bx, by);
      }
      
      // 若比出 OK，節點變黃色提示
      fill(isOK ? 'yellow' : handColor);
      noStroke();
      
      // 繪製所有 21 個手部關節點
      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        let imgW = height * (video.width/video.height);
        let mappedX = (width - imgW) / 2 + map(keypoint.x, 0, video.width, 0, imgW);
        let mappedY = map(keypoint.y, 0, video.height, 0, height);
        // 因為畫面有水平翻轉，X 座標也需要被翻轉 (照鏡子)
        let flippedX = width - mappedX;
        circle(flippedX, mappedY, isOK ? 12 : 8);
      }
    }
  }

  if (currentMode === "TEACHING") {
    if (isPopupOpen) {
      let targetAction = "";
      if (currentLeftGesture === "OK" && currentRightGesture === "OK") {
        targetAction = "CLOSE";
      } else if (currentLeftGesture === "OK") {
        targetAction = "PREV";
      } else if (currentRightGesture === "OK") {
        targetAction = "NEXT";
      }

      // 如果在冷卻中，不累積進度
      if (gestureCooldown > 0) {
        gestureCooldown--;
        tutorialProgress = 0;
      } else {
        if (targetAction !== "") {
          if (tutorialAction === targetAction) {
            tutorialProgress += 2.5; // 控制讀取速度 (每次加 2.5%，約需 40 幀 = 1秒多完成)
            if (tutorialProgress >= 100) {
              if (targetAction === "CLOSE") closePopup();
              else if (targetAction === "PREV") prevPage();
              else if (targetAction === "NEXT") nextPage();
              tutorialProgress = 0;
              tutorialAction = "";
              gestureCooldown = 40; // 執行動作後進入冷卻
            }
          } else {
            // 如果手勢改變，重置進度與目標
            tutorialAction = targetAction;
            tutorialProgress = 0;
          }
        } else {
          // 沒有偵測到手勢時，進度條逐漸倒退
          tutorialProgress = max(0, tutorialProgress - 5);
          if (tutorialProgress === 0) tutorialAction = "";
        }
      }

      // 繪製教學模式下的讀取進度條
      if (tutorialProgress > 0) {
        push();
        let barWidth = 300;
        let barX = width / 2 - barWidth / 2;
        let barY = height - 80;
        
        fill(0, 150);
        noStroke();
        rect(barX, barY, barWidth, 24, 12);
        
        fill(255, 165, 0);
        rect(barX, barY, barWidth * (tutorialProgress / 100), 24, 12);
        
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        let actionText = targetAction === "NEXT" ? "切換下一頁..." : targetAction === "PREV" ? "切換上一頁..." : "關閉教學視窗...";
        text(actionText, width / 2, barY + 12);
        pop();
      }
    }
  } else if (currentMode === "PRACTICE") {
    drawPracticeMode(currentGestures);
  } else if (currentMode === "PRE_PRACTICE") {
    drawPrePracticeMode(currentGestures);
  } else if (currentMode === "RUNNING_GAME") {
    let currentPos = "Unknown";
    if (currentGestures.length > 0) currentPos = currentGestures[0];
    
    // 手勢防抖紀錄 (連續5個frame)
    gestureHistory.push(currentPos);
    if (gestureHistory.length > GESTURE_FRAMES) gestureHistory.shift();
    
    let consistentGesture = gestureHistory[0];
    for (let i = 1; i < gestureHistory.length; i++) {
      if (gestureHistory[i] !== consistentGesture) consistentGesture = "Unknown";
    }
    
    if (!runner.isFainting && runGame.state === "PLAYING") {
      if (consistentGesture === "Point") runner.lane = 0;        
      else if (consistentGesture === "Peace") runner.lane = 1;   
      else if (consistentGesture === "Three") runner.lane = 2; 
    }
    
    drawRunningGame(consistentGesture, currentGestures);
  }

  // --- 繪製稱號 (左上角) ---
  if (isPracticeCompleted && isRunningCompleted) {
    push();
    rectMode(CORNER);
    fill(255, 215, 0, 230); // 金色半透明背景
    stroke(255, 140, 0);
    strokeWeight(3);
    rect(10, 10, 260, 50, 10);
    
    fill(0);
    noStroke();
    textSize(22);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text("🎖️ 稱號：基礎醫療專家", 20, 35);
    pop();
  }
}

// --- 進階手勢判斷 (實戰演練與跳躍小人使用) ---
function getHandPosture(hand) {
  let kp = hand.keypoints;
  if (!kp || kp.length < 21) return "Unknown";
  
  let wrist = kp[0];

  let isIndexExt = dist(kp[8].x, kp[8].y, wrist.x, wrist.y) > dist(kp[6].x, kp[6].y, wrist.x, wrist.y);
  let isMiddleExt = dist(kp[12].x, kp[12].y, wrist.x, wrist.y) > dist(kp[10].x, kp[10].y, wrist.x, wrist.y);
  let isRingExt = dist(kp[16].x, kp[16].y, wrist.x, wrist.y) > dist(kp[14].x, kp[14].y, wrist.x, wrist.y);
  let isPinkyExt = dist(kp[20].x, kp[20].y, wrist.x, wrist.y) > dist(kp[18].x, kp[18].y, wrist.x, wrist.y);
  
  let extendedCount = isIndexExt + isMiddleExt + isRingExt + isPinkyExt;

  // 取得手掌長度，作為極度穩定的動態遠近比例基準
  let palmLen = dist(wrist.x, wrist.y, kp[9].x, kp[9].y);

  // 手指愛心 (Finger Heart 🫰)：拇指尖靠近食指中段(PIP)，且食指伸出，其他三指彎曲
  let thumbToIndexPip = dist(kp[4].x, kp[4].y, kp[6].x, kp[6].y);
  let thumbToIndexTip = dist(kp[4].x, kp[4].y, kp[8].x, kp[8].y);
  if (thumbToIndexPip < (palmLen * 0.4) && thumbToIndexTip > thumbToIndexPip && isIndexExt && !isMiddleExt && !isRingExt && !isPinkyExt) {
    return "Heart";
  }

  // 捏合判斷：放寬至手掌長度的 50%，完美抵抗往外拉扯時的動態模糊
  let pinchDist = dist(kp[4].x, kp[4].y, kp[8].x, kp[8].y);
  let isPinching = pinchDist < (palmLen * 0.50); 

  // 取得食指尖到手腕的距離
  let indexTipToWrist = dist(kp[8].x, kp[8].y, wrist.x, wrist.y);

  if (isPinching) {
    // 區分捏合與握拳：如果沒張開其他手指，且食指尖緊貼手腕(拳頭特徵)，則排除捏合判定
    if (extendedCount <= 2 && indexTipToWrist < palmLen * 0.9) {
      // 放行，讓下方的程式碼將其判定為 Fist
    } else {
      if (extendedCount >= 2) return "OK";
      else return "Pinch"; 
    }
  }

  if (isIndexExt && !isMiddleExt && !isRingExt && !isPinkyExt) return "Point"; 
  if (isIndexExt && isMiddleExt && !isRingExt && !isPinkyExt) return "Peace"; 
  if (isIndexExt && isMiddleExt && isRingExt && !isPinkyExt) return "Three"; 
  if (isIndexExt && !isMiddleExt && !isRingExt && isPinkyExt) return "Horns"; 

  // 終極放寬拳頭與比讚的判定：只要沒有張開太多手指，且不是上述的點擊/YA/搖滾手勢，全視為拳頭
  // 這讓握拳繞圈等大幅度動作，絕對不會因為偶發的指頭飄移而失效
  if (extendedCount <= 2) {
    let thumbToIndBase = dist(kp[4].x, kp[4].y, kp[5].x, kp[5].y);
    if (thumbToIndBase > palmLen * 0.6) return "ThumbsUp";
    return "Fist";
  }

  if (extendedCount >= 3) return "OpenHand";
  
  return "Unknown";
}

// --- 遊戲功能與 UI 控制 ---

window.togglePracticeMode = function() {
  if (currentMode === "PRACTICE") {
    currentMode = "TEACHING";
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('btn-practice').innerText = '實戰演練';
    document.getElementById('btn-jumper').innerText = '奔跑小人';
    clearInterval(practiceTimer);
  } else {
    currentMode = "PRACTICE";
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('btn-practice').innerText = '返回教學';
    document.getElementById('btn-jumper').innerText = '奔跑小人';
    if (isPopupOpen) closePopup();
    startPractice();
  }
};

window.toggleJumper = function() {
  if (currentMode === "RUNNING_GAME") {
    currentMode = "TEACHING";
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('btn-jumper').innerText = '奔跑小人';
    document.getElementById('btn-practice').innerText = '實戰演練';
  } else {
    currentMode = "RUNNING_GAME";
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('btn-jumper').innerText = '返回教學';
    document.getElementById('btn-practice').innerText = '實戰演練';
    if (isPopupOpen) closePopup();
    startRunningGame();
  }
};

function startRunningGame() {
  // 每次從 6 種傷口中各隨機抽 1 題，組成 6 題的關卡
  runGame.selectedQuestions = [];
  for (let i = 0; i < 6; i++) {
    let randOffset = Math.floor(Math.random() * 3);
    runGame.selectedQuestions.push(RUNNING_QUESTIONS[i * 3 + randOffset]);
  }
  // 打亂題目順序
  runGame.selectedQuestions.sort(() => Math.random() - 0.5);

  runGame.currentQIndex = 0;
  runGame.score = 0;
  runGame.state = "PLAYING";
  runner.x = width / 2;
  gestureHistory = []; // 清空手勢歷史防呆
  loadQuestion();
}

function loadQuestion() {
  runGame.state = "PLAYING"; // 修復：確保回到遊玩狀態，不再無限快進
  runGame.timeLeft = 15; // 增加作答時間，減少壓迫感
  runGame.lastTime = millis();
  runGame.laneCharge = [0, 0, 0];
  runGame.flashGreen = 0;
  runGame.flashRed = 0;
  runner.lane = 1;
  runner.isFainting = false;
  runGame.explanation = "";
  runner.y = height - 120; // 重置小人位置
  gestureHistory = []; // 換題時清空歷史，防止上一題的手勢直接觸發
}

function startPractice(isNextLevel = false) {
  // 如果不是進入下一關（代表全新開始），就清空已玩過的關卡紀錄
  if (!isNextLevel) {
    playedScenarios = [];
  }
  
  let available = [];
  for (let i = 0; i < PRACTICE_SCENARIOS.length; i++) {
    if (!playedScenarios.includes(i)) available.push(i);
  }
  if (available.length === 0) { // 防呆：如果都玩過了卻還能呼叫此函數，重置陣列
    playedScenarios = [];
    for(let i = 0; i < PRACTICE_SCENARIOS.length; i++) available.push(i);
  }
  practiceScenario = available[floor(random(available.length))];
  practiceTimeLeft = 30;
  practiceStep = 0;
  practiceStatus = "PLAYING";
  flashRed = 0;
  penaltyCooldown = 0;
  fireworks = [];
  practiceProgress = 0;
  stepCompleteDelay = 0;
  stepReady = true;
  isAngleWrong = false;
  
  clearInterval(practiceTimer);
  practiceTimer = setInterval(() => {
    if (practiceTimeLeft > 0 && practiceStatus === "PLAYING") {
      practiceTimeLeft--;
    }
    if (practiceTimeLeft <= 0 && practiceStatus === "PLAYING") {
      practiceStatus = "LOST";
    }
  }, 1000);
}

function retryPractice() {
  // 重新開始目前的關卡 (保留相同的 practiceScenario)
  practiceTimeLeft = 30;
  practiceStep = 0;
  practiceStatus = "PLAYING";
  flashRed = 0;
  penaltyCooldown = 0;
  fireworks = [];
  practiceProgress = 0;
  stepCompleteDelay = 0;
  stepReady = true;
  isAngleWrong = false;
  
  clearInterval(practiceTimer);
  practiceTimer = setInterval(() => {
    if (practiceTimeLeft > 0 && practiceStatus === "PLAYING") practiceTimeLeft--;
    if (practiceTimeLeft <= 0 && practiceStatus === "PLAYING") practiceStatus = "LOST";
  }, 1000);
}

function drawPracticeMode(gestures) {
  // 🛑 【核心修復】：強制重置排版設定，防止被「跑酷模式」的 rectMode(CENTER) 殘留影響，導致座標大跑版！
  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);

  // 紅光閃爍特效
  if (flashRed > 0) {
    fill(255, 0, 0, 80);
    noStroke();
    rect(0, 0, width, height);
    flashRed--;
  }

  // 背景 UI 框
  fill(255, 230);
  noStroke();
  let boxHeight = (practiceStatus === "WON" || practiceStatus === "LOST") ? 180 : 260; // 留出更多空間給進度條與文字
  rect(width/2 - 350, 20, 700, boxHeight, 15);
  
  let scenario = PRACTICE_SCENARIOS[practiceScenario];
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("實戰演練：" + scenario.name, width/2, 50);
  
  if (practiceStatus === "PLAYING") {
    textSize(22);
    fill(220, 50, 50);
    text("⏳ 剩餘時間: " + practiceTimeLeft + " 秒", width/2, 85);
    
    let texts = getScenarioText(practiceScenario, practiceStep, practiceProgress);

    // 【1. 防跳格鎖與延遲過渡機制】
    if (!stepReady) {
      if (stepCompleteDelay > 0) {
        stepCompleteDelay--;
        fill(0, 150, 0);
        textSize(24);
        text(texts.c, width/2, 235);
        drawProgressBar(100, texts.p, true);
        return; // 在延遲期間跳過下方的手勢判定
      } else {
        practiceStep++;
        practiceProgress = 0;
        stepReady = true;
        if (practiceStep >= scenario.tasks.length) {
          practiceStatus = "WON";
          if (!playedScenarios.includes(practiceScenario)) playedScenarios.push(practiceScenario);
        }
        return;
      }
    }

    textSize(20);
    let part1 = `步驟 ${practiceStep + 1}/${scenario.tasks.length}：請做出 `;
    let part2 = `[${scenario.tasks[practiceStep]}]`;
    
    textStyle(NORMAL);
    let w1 = textWidth(part1);
    textStyle(BOLD);
    let w2 = textWidth(part2);
    let totalW = w1 + w2;
    let startX = width/2 - totalW/2;
    
    textAlign(LEFT, CENTER);
    fill(0);
    textStyle(NORMAL);
    text(part1, startX, 115);
    
    fill(220, 0, 0); // 紅色粗體
    textStyle(BOLD);
    text(part2, startX + w1, 115);
    
    // 恢復置中對齊
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);

    // 【2. 放寬手勢判定 (只要任何一隻手符合即可，不再強制鎖定單手或幀數)】
    let hasTarget = (g) => gestures.includes(g);

    // 寬容捏合判定：無論其他手指是否自然翹起 (OK手勢)，只要拇指與食指有捏合即算數
    let isPinch = hasTarget("Pinch") || hasTarget("OK");

    if (penaltyCooldown > 0) penaltyCooldown--;
    let progressInc = 0;
    let penalty = false;

    // 【3. 核心情境判定（只要手勢有做出來就穩定累加進度）】
    if (gestures.length > 0) {
      switch (practiceScenario) {
        case 0: // 一般擦傷
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 2;
          else if (practiceStep === 1 && isPinch) progressInc = 2;
          else if (practiceStep === 2 && hasTarget("Point")) progressInc = 2.5;
          else if (practiceStep === 3 && hasTarget("Fist")) progressInc = 2;
          break;
        case 1: // 輕度燙傷
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 2;
          else if (practiceStep === 1 && isPinch) progressInc = 2;
          else if (practiceStep === 2 && hasTarget("OpenHand")) progressInc = 2;
          break;
        case 2: // 急性扭傷
          if (practiceStep === 0 && hasTarget("Fist")) progressInc = 2; // 拔除間歇冰敷造成的懲罰 Bug，改為順暢累加
          else if (practiceStep === 1 && hasTarget("Fist")) progressInc = 2;
          else if (practiceStep === 2 && hasTarget("OpenHand")) progressInc = 2;
          break;
        case 3: // 異物刺傷
          if (practiceStep === 0 && isPinch) progressInc = 2;
          else if (practiceStep === 1 && hasTarget("ThumbsUp")) progressInc = 2;
          break;
        case 4: // 猛烈流鼻血
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 2;
          else if (practiceStep === 1 && isPinch) progressInc = 2;
          break;
        case 5: // 昆蟲螫傷
          if (practiceStep === 0) {
            if (hasTarget("OpenHand")) progressInc = 2;
            if (isPinch) penalty = true; // 不能用捏的，毒液會擠出
          }
          else if (practiceStep === 1 && hasTarget("Fist")) progressInc = 2;
          break;
      }
    }

    // 進度增加與懲罰處理
    if (progressInc > 0) {
      practiceProgress += progressInc;
      if (practiceProgress >= 100) {
        practiceProgress = 100;
        stepReady = false; 
        stepCompleteDelay = 90; // 鎖定 1.5 秒
      }
    } else if (penalty && penaltyCooldown === 0) {
      practiceTimeLeft = max(0, practiceTimeLeft - 3);
      flashRed = 20;
      penaltyCooldown = 60;
    } else if (penaltyCooldown === 0 && gestures.length > 0 && progressInc === 0) {
      if (frameCount % 60 === 0) { // 放寬扣時
        practiceTimeLeft = max(0, practiceTimeLeft - 1);
        flashRed = 10;
      }
    }

    // 繪製下方進度條
    drawProgressBar(practiceProgress, texts.p, false, false, "");
  } else if (practiceStatus === "WON") {
    if (playedScenarios.length >= PRACTICE_SCENARIOS.length) {
      isPracticeCompleted = true; // 達成實戰演練全通關條件
      fill(200, 100, 0);
      textSize(32);
      text("🏆 隱藏成就解鎖：醫療大師！ 🏆\n全部關卡已完美通關！", width/2, 100);
      fill(0);
      textSize(20);
      text("比出 🤘 (搖滾手勢) 返回初始畫面", width/2, 165);
      
      if (gestures.includes("Horns")) {
        togglePracticeMode();
      }
    } else {
      fill(0, 150, 0);
      textSize(32);
      text("✨ 完美救援成功！得分：100分 ✨", width/2, 90);
      fill(0);
      textSize(20);
      text("比出 ✌️ (YA) 進行下一關 | 比出 🤘 (搖滾) 返回初始畫面", width/2, 150);
      
      if (gestures.includes("Peace")) {
        startPractice(true); // 保留紀錄進入下一關
      } else if (gestures.includes("Horns")) {
        togglePracticeMode();
      }
    }
    drawFireworks();
  } else if (practiceStatus === "LOST") {
    fill(200, 0, 0);
    textSize(32);
    text("❌ 救援失敗，再試一次！", width/2, 90);
    fill(0);
    textSize(20);
    text("比出  (手指愛心) 重試目前關卡 | 比出 🤘 (搖滾) 返回", width/2, 150);
    
    if (gestures.includes("Heart")) {
      retryPractice();
    } else if (gestures.includes("Horns")) {
      togglePracticeMode();
    }
  }
}

// --- 啟動測前練習模式 ---
window.startPrePractice = function() {
  currentMode = "PRE_PRACTICE";
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('btn-practice').innerText = '實戰演練';
  document.getElementById('btn-jumper').innerText = '奔跑小人';
  closePopup();
  
  practiceScenario = currentLevel; // 鎖定為當前教學視窗的關卡
  practiceStep = 0;
  practiceStatus = "PLAYING";
  practiceProgress = 0;
  stepCompleteDelay = 0;
  stepReady = true;
  flashRed = 0;
  penaltyCooldown = 0;
  prePracticeStuckTimer = 0; // 重置卡關計時器
  fireworks = [];
  
  clearInterval(practiceTimer); // 確保沒有實戰計時器干擾
};

// --- 繪製測前練習模式 (無壓力、放慢進度、加入視覺提示) ---
function drawPrePracticeMode(gestures) {
  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);

  if (flashRed > 0) {
    fill(255, 0, 0, 80);
    noStroke();
    rect(0, 0, width, height);
    flashRed--;
  }

  fill(255, 230);
  noStroke();
  let boxHeight = (practiceStatus === "WON") ? 180 : 320; // 加高框體以容納手勢提示
  rect(width/2 - 350, 20, 700, boxHeight, 15);
  
  let scenario = PRACTICE_SCENARIOS[practiceScenario];
  
  fill(0);
  textSize(28);
  text("💪 測前手勢練習：" + scenario.name, width/2, 50);
  
  if (practiceStatus === "PLAYING") {
    textSize(20);
    fill(0, 150, 150);
    text("（無時間限制，進度條稍慢，請放輕鬆慢慢熟悉手勢！）", width/2, 85);
    
    let texts = getScenarioText(practiceScenario, practiceStep, practiceProgress);

    if (!stepReady) {
      if (stepCompleteDelay > 0) {
        stepCompleteDelay--;
        prePracticeStuckTimer = 0; // 過渡期間不計算卡關
        fill(0, 150, 0);
        textSize(24);
        text(texts.c, width/2, 260); // 配合框體拉高往下移
        drawProgressBar(100, texts.p, true);
        return; 
      } else {
        practiceStep++;
        practiceProgress = 0;
        stepReady = true;
        if (practiceStep >= scenario.tasks.length) {
          practiceStatus = "WON";
        }
        return;
      }
    }

    textSize(20);
    let part1 = `步驟 ${practiceStep + 1}/${scenario.tasks.length}：請做出 `;
    let part2 = `[${scenario.tasks[practiceStep]}]`;
    
    textStyle(NORMAL);
    let w1 = textWidth(part1);
    textStyle(BOLD);
    let w2 = textWidth(part2);
    let totalW = w1 + w2;
    let startX = width/2 - totalW/2;
    
    textAlign(LEFT, CENTER);
    fill(0);
    textStyle(NORMAL);
    text(part1, startX, 115);
    
    fill(220, 0, 0); // 紅色粗體
    textStyle(BOLD);
    text(part2, startX + w1, 115);
    
    // 恢復置中對齊
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    
    // 💡 視覺化手勢提示
    let requiredGesture = scenario.gestures[practiceStep];
    let hintStr = GESTURE_EMOJIS[requiredGesture] || "🖐️";
    fill(0, 102, 204);
    textSize(30);
    text("視覺提示：" + hintStr, width/2, 260);

    let hasTarget = (g) => gestures.includes(g);
    let isPinch = hasTarget("Pinch") || hasTarget("OK");

    let progressInc = 0;

    // 放慢進度條的累積速度 (將原本的 +2 / +2.5 砍半)
    if (gestures.length > 0) {
      switch (practiceScenario) {
        case 0:
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 1;
          else if (practiceStep === 1 && isPinch) progressInc = 1;
          else if (practiceStep === 2 && hasTarget("Point")) progressInc = 1.25;
          else if (practiceStep === 3 && hasTarget("Fist")) progressInc = 1;
          break;
        case 1:
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 1;
          else if (practiceStep === 1 && isPinch) progressInc = 1;
          else if (practiceStep === 2 && hasTarget("OpenHand")) progressInc = 1;
          break;
        case 2:
          if (practiceStep === 0 && hasTarget("Fist")) progressInc = 1;
          else if (practiceStep === 1 && hasTarget("Fist")) progressInc = 1;
          else if (practiceStep === 2 && hasTarget("OpenHand")) progressInc = 1;
          break;
        case 3:
          if (practiceStep === 0 && isPinch) progressInc = 1;
          else if (practiceStep === 1 && hasTarget("ThumbsUp")) progressInc = 1;
          break;
        case 4:
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 1;
          else if (practiceStep === 1 && isPinch) progressInc = 1;
          break;
        case 5:
          if (practiceStep === 0 && hasTarget("OpenHand")) progressInc = 1;
          else if (practiceStep === 1 && hasTarget("Fist")) progressInc = 1;
          break;
      }
    }

    if (progressInc > 0) {
      prePracticeStuckTimer = 0; // 有累積進度就重置卡關計時器
      practiceProgress += progressInc;
      if (practiceProgress >= 100) {
        practiceProgress = 100;
        stepReady = false; 
        stepCompleteDelay = 90; 
      }
    } else {
      prePracticeStuckTimer++; // 沒有進展時持續計時
      if (penaltyCooldown === 0 && gestures.length > 0) {
        // 若動作錯誤提供極輕微的視覺回饋 (不扣時)，避免玩家不知道沒對到
        if (frameCount % 60 === 0) flashRed = 10;
      }
    }
    
    // 💡 卡關提示：如果超過 180 幀 (約 3 秒) 沒有累積進度，顯示提示字樣
    if (prePracticeStuckTimer > 180) {
      fill(220, 80, 80);
      textSize(18);
      text("💡 偵測不到手勢？試著將手放遠一點或調整角度！", width/2, 300);
    }

    drawProgressBar(practiceProgress, texts.p, false, false, "");
  } else if (practiceStatus === "WON") {
    fill(0, 150, 0);
    textSize(32);
    text("✨ 練習完成！您的手勢非常標準 ✨", width/2, 90);
    fill(0);
    textSize(20);
    text("比出 🤘 (搖滾) 返回教學面板", width/2, 150);
    
    if (gestures.includes("Horns")) {
      currentMode = "TEACHING";
      document.getElementById('sidebar').style.display = 'flex';
      openPopup(practiceScenario); // 自動開回剛才練習的教學視窗
    }
    drawFireworks();
  }
}

// --- 真正 8-bit 像素小人陣列 ---
const DOCTOR_PALETTE = [null, "#111111", "#FFCC99", "#FFFFFF", "#FF3333", "#336699", "#663300"];
const DOCTOR_SPRITE = [
  [0,0,0,1,1,1,1,1,0,0,0],
  [0,0,1,3,3,3,3,3,1,0,0],
  [0,1,3,3,4,3,3,3,3,1,0],
  [0,1,3,4,4,4,3,3,3,1,0],
  [0,1,3,3,4,3,3,3,3,1,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,0,1,2,2,2,2,2,1,0,0],
  [0,1,2,1,2,2,1,2,2,1,0],
  [0,1,2,2,2,2,2,2,2,1,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,1,3,3,3,3,3,3,3,1,0],
  [1,2,1,3,3,3,3,3,1,2,1],
  [1,2,1,3,3,3,3,3,1,2,1],
  [0,1,1,5,5,5,5,5,1,1,0],
  [0,0,1,5,5,1,5,5,1,0,0],
  [0,0,1,6,6,1,6,6,1,0,0],
  [0,0,1,1,1,1,1,1,1,0,0]
];

function drawPixelRunner(x, y, isFainted, isDashing) {
  push();
  translate(x, y);
  
  if (isFainted) {
    rotate(PI / 2);
    translate(0, -20);
  } else if (isDashing) {
    translate(0, sin(frameCount * 1.5) * 8); // 衝刺時大彈跳
  } else {
    translate(0, sin(frameCount * 0.5) * 4); // 待命時呼吸彈跳
  }
  
  let s = 4; // 像素放大倍率
  let w = DOCTOR_SPRITE[0].length * s;
  let h = DOCTOR_SPRITE.length * s;
  
  translate(-w/2, -h); // 讓錨點置於腳底中心
  
  noStroke();
  // 繪製陰影
  fill(0, 50);
  ellipse(w/2, h, 30, 10);
  
  // 根據陣列繪製真實像素
  for (let row = 0; row < DOCTOR_SPRITE.length; row++) {
    for (let col = 0; col < DOCTOR_SPRITE[row].length; col++) {
      let colorIdx = DOCTOR_SPRITE[row][col];
      if (colorIdx !== 0) {
        fill(DOCTOR_PALETTE[colorIdx]);
        let drawY = row * s;
        // 跑步交替擺腿動畫 (控制下半部 13~16 行)
        if (!isFainted && row >= 13) {
          let legOffset = sin(frameCount * (isDashing ? 1.5 : 0.5)) * s * 1.2;
          if (col < 5) drawY += legOffset;      // 左腿
          else if (col > 5) drawY -= legOffset; // 右腿
        }
        rect(col * s, drawY, s, s);
      }
    }
  }
  pop();
}

// --- 絕對置中換行文字繪製 (完美避開 p5.js 中文排版 Bug) ---
function drawWrappedText(str, x, y, maxWidth, lineHeight) {
  let lines = [];
  let currentLine = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === '\n') {
      lines.push(currentLine);
      currentLine = "";
      continue;
    }
    let testLine = currentLine + char;
    if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);

  let startY = y - ((lines.length - 1) * lineHeight) / 2;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * lineHeight);
  }
}

// --- 繪製奔跑小人答題遊戲 ---
function drawRunningGame(consistentGesture, currentGestures) {
  rectMode(CORNER);

  // 1. 畫背景與跑道
  fill(30, 40, 50);
  rect(0, 0, width, height); // 深色底色

  let laneW = width / 3;
  let qBoxW = width * 0.9; // 動態文字框寬度，防止超出版面

  // 畫跑酷路面
  fill(100);
  rect(0, 200, width, height - 200);

  // 畫動態滾動的虛線 (模擬前進速度)
  stroke(255, 150);
  strokeWeight(6);
  let scrollSpeed = runGame.state === "DASHING" ? 20 : 5;
  let scrollOffset = (frameCount * scrollSpeed) % 60;
  
  for (let y = 200 - scrollOffset; y < height; y += 60) {
    if (y > 200) {
      line(laneW, y, laneW, y + 30);
      line(laneW * 2, y, laneW * 2, y + 30);
    }
  }
  noStroke();

  // 2. 處理全螢幕閃爍特效
  if (runGame.flashGreen > 0) {
    fill(0, 255, 0, map(runGame.flashGreen, 30, 0, 150, 0));
    rect(0, 0, width, height);
    runGame.flashGreen--;
  }
  if (runGame.flashRed > 0) {
    fill(255, 0, 0, map(runGame.flashRed, 30, 0, 150, 0));
    rect(0, 0, width, height);
    runGame.flashRed--;
  }

  let q = runGame.selectedQuestions[runGame.currentQIndex];
  if (!q || runGame.state === "GAME_WON") {
     isRunningCompleted = true;
     if (runGame.score === 60) isRunningPerfect = true; // 6題全對(60分)獲得成就

     fill(255, 240);
     rectMode(CENTER);
     rect(width/2, height/2, 600, 240, 15);
     fill(0, 140, 0);
     textSize(28);
     textAlign(CENTER, CENTER);
     let winText = "🎉 恭喜完成 6 道實戰題！\n最終得分：" + runGame.score;
     if (isRunningPerfect) winText += "\n\n🏆 獲得成就：醫療小尖兵！";
     text(winText, width/2, height/2 - 30);
     textSize(20); fill(100);
     text("比出 🫰 (手指愛心) 再玩一次 | 比出 🤘 (搖滾) 返回", width/2, height/2 + 70);
     if (currentGestures.includes("Heart")) startRunningGame();
     else if (currentGestures.includes("Horns")) toggleJumper();
     rectMode(CORNER);
     return;
  }

  // 3. 畫上方題目區
  rectMode(CENTER);
  fill(255, 245);
  noStroke();
  rect(width/2, 100, qBoxW, 160, 15);
  fill(0, 120, 180);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(`第 ${runGame.currentQIndex + 1} / 6 題  (分數: ${runGame.score})`, width/2, 35);
  
  fill(0);
  textSize(22);
  textStyle(BOLD);
  drawWrappedText(q.q, width/2, 105, qBoxW - 40, 30);
  textStyle(NORMAL);

  // 4. 倒數計時器
  if (runGame.state === "PLAYING" && !runner.isFainting) {
    if (millis() - runGame.lastTime > 1000) {
      runGame.timeLeft = max(0, runGame.timeLeft - 1); // 防呆：秒數最低為 0
      runGame.lastTime = millis();
    }
  }
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(runGame.timeLeft <= 3 ? color(255, 50, 50) : color(0, 150, 0));
  text("⏱️ " + runGame.timeLeft + " 秒", width/2, 150);

  // 5. 繪製跑道選項與閘門
  let gateY = 350; // 選項稍微往下移，拉開與題目的距離
  for (let i = 0; i < 3; i++) {
    let lx = i * laneW + laneW / 2;
    rectMode(CENTER);
    
    // 閘門發光底座
    noStroke();
    fill(255, 220);
    if (runner.lane === i && runGame.state === "PLAYING") fill(100, 220, 255, 230);
    rect(lx, gateY, laneW - 20, 150, 15); 
    
    fill(0);
    textSize(18); // 稍微縮小字體確保長選項塞得下
    textAlign(CENTER, CENTER);
    drawWrappedText(q.options[i], lx, gateY, laneW - 30, 24);

    // 駐留集氣條
    if (runGame.state === "PLAYING" && runner.lane === i && !runner.isFainting) {
      runGame.laneCharge[i] += (100 / 180); // 再次減慢速度，需穩定停留滿 3 秒才衝刺，防止過快誤觸
      if (runGame.laneCharge[i] >= 100 || runGame.timeLeft <= 0) {
        runGame.state = "DASHING"; // 觸發衝刺
      }
      rectMode(CORNER);
      fill(200);
      rect(lx - 60, gateY + 85, 120, 15, 8);
      fill(0, 200, 0);
      rect(lx - 60, gateY + 85, 120 * (runGame.laneCharge[i]/100), 15, 8);
    } else {
      runGame.laneCharge[i] = 0;
    }
  }

  // 如果時間到但沒有充滿，強制衝刺結算
  if (runGame.state === "PLAYING" && runGame.timeLeft <= 0 && !runner.isFainting) {
    runGame.state = "DASHING";
  }

  // 小人平滑移動 (lerp)
  let targetX = runner.lane * laneW + laneW / 2;
  runner.x = lerp(runner.x, targetX, 0.15);
  
  if (runGame.state === "DASHING") {
    runner.y = lerp(runner.y, gateY + 60, 0.2); // 往前衝刺
    if (abs(runner.y - (gateY + 60)) < 5) {
       checkRunAnswer(runner.lane);
    }
  } else {
    runner.y = lerp(runner.y, height - 120, 0.1); // 回到原位
  }

  // 繪製小人
  drawPixelRunner(runner.x, runner.y, runner.isFainting, runGame.state === "DASHING");

  // 6. 答題後的回饋視窗 (包含正確與錯誤)
  if (runGame.state === "CORRECT_DELAY" || runGame.state === "WRONG_DELAY") {
    rectMode(CENTER);
    fill(255, 245);
    noStroke();
    rect(width/2, height/2 + 50, qBoxW, 250, 15);

    if (runGame.state === "CORRECT_DELAY") {
      fill(0, 180, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("✅ 答對了！", width/2, height/2 - 40);
    } else {
      fill(220, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("❌ 答錯了！(扣 3 秒)", width/2, height/2 - 40);
    }
    
    fill(50);
    textSize(20);
    textAlign(CENTER, CENTER);
    drawWrappedText(runGame.explanation, width/2, height/2 + 50, qBoxW - 40, 30);

    // 解析文字確實停留 3.5 秒
    if (millis() - runGame.delayStart > 3500) {
      if (runGame.state === "CORRECT_DELAY") {
        runGame.currentQIndex++;
        if (runGame.currentQIndex >= runGame.selectedQuestions.length) {
          runGame.state = "GAME_WON";
        } else {
          loadQuestion();
        }
      } else {
        // 答錯，恢復遊戲狀態重試
        runGame.state = "PLAYING";
        runGame.timeLeft = max(0, runGame.timeLeft - 3);
        runGame.laneCharge = [0, 0, 0];
        runner.isFainting = false;
        runner.y = height - 120; // 歸位
        gestureHistory = []; // 清空手勢歷史防呆
      }
    }
  }
  rectMode(CORNER);
}

function checkRunAnswer(chosenLane) {
  let q = runGame.selectedQuestions[runGame.currentQIndex];
  if (chosenLane === q.ans) {
    runGame.state = "CORRECT_DELAY";
    runGame.flashGreen = 30;
    runGame.score += 10;
    runGame.explanation = q.exp;
  } else {
    runGame.state = "WRONG_DELAY"; // 進入專屬錯誤視窗狀態，解決略過問題
    runGame.flashRed = 30;
    runGame.explanation = q.exp;
    runner.isFainting = true;
  }
  runGame.delayStart = millis();
}

// --- 繪製進度條組件 ---
function drawProgressBar(progress, label, isSuccess = false, isWarning = false, warningText = "") {
  let barWidth = 400, barHeight = 24;
  let barX = width/2 - barWidth/2, barY = 145; // 往下移
  
  stroke(0); strokeWeight(2); noFill();
  rectMode(CORNER); // 確保進度條排版不受干擾
  rect(barX, barY, barWidth, barHeight, 10);
  
  noStroke();
  if (isWarning) {
    fill(255, 0, 0, 180);
    rect(barX, barY, barWidth * (progress / 100), barHeight, 10);
    fill(255, 0, 0);
    textSize(20);
    text(warningText, width/2, 195);
  } else {
    fill(isSuccess ? color(0, 200, 0, 180) : color(0, 200, 0, 180));
    rect(barX, barY, barWidth * (progress / 100), barHeight, 10);
    fill(isSuccess ? color(0, 150, 0) : color(0, 120, 200));
    textSize(20);
    text(label, width/2, 195);
  }
}

// --- 生成實戰演練進度文字 ---
function getScenarioText(scenarioIdx, stepIdx, progress) {
  let p = Math.floor(progress);
  switch (scenarioIdx) {
    case 0: // 一般擦傷
      switch (stepIdx) {
        case 0: return { p: `🔍 正在沖洗沙子與髒污... ${p}%`, c: `✨ 傷口已洗淨！請準備消毒。` };
        case 1: return { p: `🧪 正在由內向外同心圓消毒... ${p}%`, c: `✨ 消毒完成！請準備塗抹藥膏。` };
        case 2: return { p: `🧴 正在塗抹消炎藥膏... ${p}%`, c: `✨ 藥膏塗妥！紗布已覆蓋，準備固定。` };
        case 3: return { p: `Wrapping 正在纏繞網繃固定... ${p}%`, c: `🎉 擦傷包紮完美完成！` };
      }
      break;
    case 1: // 輕度燙傷
      switch (stepIdx) {
        case 0: return { p: `❄️ 正在浸泡冷水降低皮下熱能... ${p}%`, c: `✨ 降溫完成！請準備移除衣物。` };
        case 1: return { p: `✂️ 正在小心剪開/移開周圍衣物... ${p}%`, c: `✨ 衣物移除！請準備覆蓋保護。` };
        case 2: return { p: `🩹 正在將無菌紗布輕輕覆蓋水泡... ${p}%`, c: `🎉 燙傷保護完美完成！請勿弄破水泡。` };
      }
      break;
    case 2: // 急性扭傷
      switch (stepIdx) {
        case 0: return { p: `🧊 正在進行間歇性冰敷收縮血管... ${p}%`, c: `✨ 冰敷止痛完成！請準備八字包紮。` };
        case 1: return { p: `🩹 正在以八字法纏繞彈性繃帶... ${p}%`, c: `✨ 關節固定完成！請準備抬高患處。` };
        case 2: return { p: `🚀 正在抬高患處促進血液回流... ${p}%`, c: `🎉 扭傷急救完美完成！` };
      }
      break;
    case 3: // 異物刺傷
      switch (stepIdx) {
        case 0: return { p: `🔍 正在捏合拔除木屑... ${p}%`, c: `✨ 木屑拔除！請準備加壓止血。` };
        case 1: return { p: `🩸 正在用乾淨棉球局部加壓止血... ${p}%`, c: `🎉 刺傷止血完美完成！` };
      }
      break;
    case 4: // 猛烈流鼻血
      switch (stepIdx) {
        case 0: return { p: `🙇 正在引導角色身體前傾低頭... ${p}%`, c: `✨ 姿勢正確！請準備壓迫止血。` };
        case 1: return { p: `👃 正在用手指捏住兩側鼻翼... ${p}%`, c: `🎉 鼻血已止住！請改用嘴巴呼吸。` };
      }
      break;
    case 5: // 昆蟲螫傷
      switch (stepIdx) {
        case 0: return { p: `💳 正在用硬卡片平刮剔除蜂針... ${p}%`, c: `✨ 蜂針與毒囊已移開！請準備冷敷。` };
        case 1: return { p: `❄️ 正在冷敷患處以減緩毒液擴散... ${p}%`, c: `🎉 螫傷處理完美完成！` };
      }
      break;
  }
  return { p: `處理中... ${p}%`, c: `步驟完成！` };
}

function drawFireworks() {
  if (fireworks.length === 0 && frameCount % 30 === 0) {
    for(let i = 0; i < 40; i++) {
      fireworks.push({
        x: width / 2,
        y: height / 2 - 50,
        vx: random(-6, 6),
        vy: random(-6, 6),
        life: 255,
        c: color(random(150, 255), random(150, 255), random(150, 255))
      });
    }
  }
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let p = fireworks[i];
    fill(red(p.c), green(p.c), blue(p.c), p.life);
    noStroke();
    circle(p.x, p.y, 8);
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; // 重力
    p.life -= 4;
    if (p.life <= 0) fireworks.splice(i, 1);
  }
}
// --- HTML UI 控制邏輯 ---

// --- 首頁指南資料庫 ---
const GUIDE_DATA = {
  "WEB": {
    title: "🌐 網頁說明",
    content: "歡迎來到「急救醫療手勢教學系統」！<br><br>本網站分為三大模式：<br>1. <b>教學模式</b>：學習各種傷口的正確處理方式。<br>2. <b>實戰演練</b>：模擬真實緊急情況，考驗您的手勢應變能力。<br>3. <b>奔跑小人</b>：趣味問答小遊戲，驗收您的醫療知識。<br><br>請確保您的視訊鏡頭已開啟，並在光線充足的環境下進行操作以確保最佳辨識效果。"
  },
  "PRACTICE": {
    title: "🚑 實戰測驗說明",
    content: "<b>【如何進行】</b><br>系統會隨機抽取一個急救情境，您必須在 30 秒的時限內，依序對著鏡頭做出正確的急救處理手勢。<br><br><b>【評斷標準】</b><br>✔️ <b>準確度</b>：畫面下方會有進度條，維持正確手勢即可累積進度。<br>❌ <b>懲罰機制</b>：如果做錯特定手勢（例如昆蟲螫傷時誤用捏合手勢），系統將會判定嚴重失誤並扣除秒數！<br>🏆 <b>通關條件</b>：在時間歸零前完成所有步驟即可成功救援。"
  },
  "RUNNER": {
    title: "🏃 奔跑小人測驗說明",
    content: "<b>【小遊戲玩法】</b><br>這是一個結合知識與反應的跑酷問答遊戲！畫面上方會出現急救醫療問題，您必須引導小人跑向正確的答案跑道。<br><br><b>【關鍵手勢操作】</b><br>☝️ <b>比出 1 (單伸食指)</b>：移動到<b>左跑道</b><br>✌️ <b>比出 2 (YA)</b>：移動到<b>中跑道</b><br>🤟 <b>比出 3 (三指)</b>：移動到<b>右跑道</b><br><br><b>【特別注意：彈性變換】</b><br>在倒數計時（15秒）結束前，您<b>可以根據題目隨時改變手勢與答案</b>！小人會隨之左右移動。直到倒數結束或集氣條滿時，才會鎖定最終停留在的跑道進行結算。答對獲得分數，答錯則會被扣除 3 秒！"
  },
  "GESTURE": {
    title: "🖐️ 全網站手勢操作說明",
    content: "為了讓系統準確辨識，請確保手部完整出現在鏡頭畫面中：<br><br>👌 <b>OK手勢</b>：教學模式中控制上一頁/下一頁/關閉。<br>✋ <b>布 (手掌張開)</b>：用於清洗、降溫、低頭等動作。<br>🤏 <b>捏合</b>：用於夾取異物、脫除衣物、捏住鼻翼。<br>☝️ <b>單指 (食指)</b>：用於定點塗藥。<br>✊ <b>拳頭</b>：用於冰敷、包紮固定。<br>🫰 <b>手指愛心</b>：重新挑戰失敗的實戰關卡。<br>✌️ <b>比耶手勢</b>：完成一關後繼續進行下一關。<br>🤘 <b>搖滾手勢</b>：實戰結束後返回主選單。"
  }
};

window.openGuidePopup = function(guideType) {
  isPopupOpen = true;
  let popup = document.getElementById('instruction-popup');
  popup.classList.remove('hidden');
  popup.style.zIndex = '99999'; // 確保彈出視窗突破首頁覆蓋層，顯示在最前面
  
  let data = GUIDE_DATA[guideType];
  let contentHtml = `
    <h2>${data.title}</h2>
    <hr>
    <p style="color: #333; font-size: 16px; line-height: 1.8; text-align: left; padding: 10px;">${data.content}</p>
    <br>
    <div style="text-align: center;">
      <button onclick="closePopup()" style="padding: 10px 20px; font-size: 18px; border-radius: 10px; cursor: pointer; background: #0078b4; color: white; border: none; font-weight: bold;">我知道了</button>
    </div>
  `;
  document.getElementById('popup-content').innerHTML = contentHtml;
  
  // 隱藏教學模式專用的導覽元素 (上一頁/下一頁)
  let controls = document.getElementById('popup-controls');
  if (controls) controls.style.display = 'none';
};

window.openPopup = function(levelIdx) {
  currentLevel = levelIdx;
  currentPage = 0;
  isPopupOpen = true;
  document.getElementById('instruction-popup').classList.remove('hidden');
  
  // 確保進入教學模式時，導覽元素正常顯示
  let controls = document.getElementById('popup-controls');
  if (controls) controls.style.display = '';
  
  updatePopupContent();
};

window.closePopup = function() {
  isPopupOpen = false;
  let popup = document.getElementById('instruction-popup');
  popup.classList.add('hidden');
  popup.style.zIndex = ''; // 關閉時重置層級，避免影響後續主遊戲畫面的排版
};

window.nextPage = function() {
  if (currentLevel < 0 || !isPopupOpen) return;
  if (currentPage < levelData[currentLevel].pages.length - 1) {
    currentPage++;
    updatePopupContent();
  } else {
    closePopup(); // 最後一頁按下一步自動關閉
  }
};

window.prevPage = function() {
  if (currentLevel < 0 || !isPopupOpen) return;
  if (currentPage > 0) {
    currentPage--;
    updatePopupContent();
  }
};

function updatePopupContent() {
  let data = levelData[currentLevel];
  let page = data.pages[currentPage];
  
  let contentHtml = `
    <h2>${data.title}</h2>
    <p style="color: #666; font-size: 16px;"><strong>${data.concept}</strong></p>
    <hr>
    <h3>${page.action}</h3>
    <p style="color: #444; font-size: 15px; line-height: 1.6; margin-bottom: 15px;"><strong>💡 原理：</strong>${page.conceptText || ""}</p>
    <h4>🎯 核心手勢：${page.gesture}</h4>
    <p style="color: #111; font-size: 15px; line-height: 1.6;">${page.text.replace(/\n/g, '<br>')}</p>
    <div style="text-align: center; margin-top: 20px;">
      <button onclick="startPrePractice()" style="padding: 10px 25px; font-size: 18px; font-weight: bold; background-color: #4caf50; color: white; border: 2px solid #388e3c; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">💪 測前手勢練習</button>
    </div>
  `;
  
  document.getElementById('popup-content').innerHTML = contentHtml;
  document.getElementById('page-indicator').innerText = `${currentPage + 1} / ${data.pages.length}`;
  
  // 按鈕狀態控制
  document.getElementById('prev-btn').disabled = (currentPage === 0);
  document.getElementById('next-btn').innerText = (currentPage === data.pages.length - 1) ? "完成 ➡" : "下一步 ➡";
}

function windowResized() {
  let container = document.getElementById('canvas-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}
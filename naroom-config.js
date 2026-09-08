/* ================================================================
   ★★★ 사장님 수정 구역 ★★★
   - 평소에는 관리 페이지(admin.html)에서 고치세요. 거기서 저장한 값이 이 파일보다 우선합니다.
   - 이 파일의 값은 "관리 페이지에 저장된 게 없을 때"의 기본값입니다.
================================================================ */

// 설정 저장소(Supabase) — 건드리지 마세요
const SUPA_URL='https://rxevovgoorvtkabbvnfi.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4ZXZvdmdvb3J2dGthYmJ2bmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3OTc2MzIsImV4cCI6MjEwMDM3MzYzMn0.1cmMUd5z2BciYErBdVDfWmBv_uoKit-ADpSV_8apjiI';

// ① 시즌 공지 — 페이지 맨 위에 한 칸 표시됩니다.
//    on:false 로 바꾸면 숨김. until 날짜가 지나면 자동으로 사라집니다.
//    다음 시즌엔 tag / title / sub / link / until 만 바꾸세요. (sub 안의 <b></b>는 빨간 강조)
const NOTICE={
  on:true,
  tag:'CHUSEOK GIFT',
  title:'2026 추석 선물세트 예약중',
  sub:'예약 <b>9/20까지</b> · 픽업 9/14~9/24',
  link:'https://naroom-chuseok.vercel.app',
  until:'2026-09-24',
};

// ② 공휴일 — 이 날짜는 공휴일 시간표(공방 10~14시 · 무인 14~20시)로 열립니다.
const HOLIDAYS=['2025-01-01','2025-01-28','2025-01-29','2025-01-30','2025-03-01','2025-05-05','2025-05-06','2025-06-06','2025-08-15','2025-10-03','2025-10-09','2025-12-25','2026-01-01','2026-02-16','2026-02-17','2026-02-18','2026-03-01','2026-05-01','2026-05-05','2026-06-06','2026-08-15','2026-09-24','2026-09-25','2026-09-26','2026-10-03','2026-10-09','2026-12-25'];

// ③ 마감한 날짜 — 그날은 예약 마감으로 표시됩니다.  예) '2026-10-10',
const BLOCKED_DATES=[

];

// ④ 마감한 시간 — 그날 그 시간칸만 마감으로 표시됩니다.  예) '2026-10-10':['10:00~10:30','10:30~11:00'],
const BLOCKED_TIMES={

};

// ⑤ 특별 운영일 — 월요일 예외 오픈, 명절 등. y=공방 픽업 [시작,끝] / m=무인 픽업 [시작,끝] (무인 없으면 m:[])
//    예) '2026-08-17':{y:[10,14],m:[]}   → 월요일이지만 공방 픽업 10~14시만 오픈
const SPECIAL_HOURS={
  '2026-05-25':{y:[10,16],m:[16,20]},
  '2026-06-03':{y:[10,14],m:[14,20]},
  '2026-06-06':{y:[9,15], m:[15,20]},
  '2026-08-15':{y:[9,16], m:[16,20]},
  '2026-08-17':{y:[10,14],m:[]},
};

// ⑥ 답례 구성 — 가격·최소 세트·평일 전용을 여기서 고칩니다. 품절이면 soldout:true
//    weekday:true = 평일 픽업 전용 (토·일·공휴일 픽업 불가)
const GIFT_ITEMS=[
  {id:'g2a', name:'2구 답례 · 찹쌀떡 양갱',    price:6500,  min:10, weekday:false, img:'gift_01.jpg', desc:'여러 분께 하나씩 가볍게 챙겨드리는 답례',   items:'호두 찹쌀떡 · 밤 품은 팥양갱'},
  {id:'g2b', name:'2구 답례 · 곶감말이 화과자', price:8500,  min:10, weekday:false, img:'gift_02.jpg', desc:'가족 행사 답례로 가장 자주 준비되는 구성', items:'호두 가득 품은 곶감말이 · 밤 품은 밤송이 화과자', best:true},
  {id:'g3',  name:'3구 답례',                 price:12500, min:10, weekday:true,  img:'gift_03.jpg', desc:'세 가지를 나란히 담은 기본 답례',          items:'밤 품은 팥양갱 · 호두 가득 품은 곶감말이 · 밤 품은 밤송이 화과자'},
  {id:'g4',  name:'4구 답례',                 price:21000, min:10, weekday:true,  img:'gift_04.jpg', desc:'설기와 찰떡까지 네 가지를 담은 답례',       items:'앙금꽃 쁘띠설기 · 복숭아모나카 · 달맞이 토끼 찰떡 · 크림블설기'},
  {id:'g6',  name:'6구 답례',                 price:25000, min:10, weekday:false, img:'gift_05.jpg', desc:'여러 가지를 넉넉히 담아 전하는 답례',       items:'밤 품은 팥양갱 · 밤 품은 밤송이 화과자 ×2 · 호두 가득 품은 곶감말이 ×2 · 콩고물 도라지정과'},
  {id:'gw6', name:'호두 찹쌀떡 6구',           price:32000, min:2,  weekday:false, img:'gift_06.jpg', desc:'호두 찹쌀떡만 여섯 개를 담은 상자',          items:'호두 찹쌀떡 ×6'},
  {id:'gs6', name:'앙금꽃 설기 6구',           price:33000, min:1,  weekday:true,  img:'gift_07.jpg', desc:'앙금꽃 설기만 여섯 개를 담은 선물',          items:'앙금꽃 쁘띠설기 ×6'},
  {id:'gd',  name:'도라지진액 세트',            price:57000, min:1,  weekday:false, img:'gift_08.jpg', desc:'도라지진액과 복숭아모나카를 함께',           items:'복숭아모나카 ×4 · 국산 도라지진액'},
  {id:'gp',  name:'복숭아모나카 set',           price:55000, min:5,  weekday:true,  img:'gift_09.jpg', desc:'',                                       items:'국산 도라지진액 · 복숭아모나카 ×2 · 달맞이 토끼 찰떡 ×2'},
];
const GIFT_NOTES=['사전예약으로 준비합니다.','상품별 최소 주문 수량을 확인해주세요.','설기 포함 구성은 평일 픽업만 가능합니다.','주문 수량과 일정에 따라 제작 가능 여부가 달라질 수 있습니다.'];
const KAKAO_URL='https://pf.kakao.com/_HBzyu/chat';
/* ============================================================== */

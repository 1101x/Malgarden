import { useState, useRef, useEffect } from "react";

const POOL = {
  0: [
    { word: "황홀하다", pron: "hwang-hol-ha-da", type: "형용사", short: "넋을 잃을 만큼 아름답다", ex: "저녁 노을이 황홀하게 피어올랐다" },
    { word: "눈부시다", pron: "nun-bu-si-da", type: "형용사", short: "빛나도록 찬란하다", ex: "그녀의 미소가 눈부시도록 빛났다" },
    { word: "찬란하다", pron: "chan-ran-ha-da", type: "형용사", short: "밝고 화려하여 눈을 압도한다", ex: "봄 햇살이 찬란하게 쏟아졌다" },
    { word: "벅차다", pron: "beok-cha-da", type: "형용사", short: "감정이 터질 듯 넘치다", ex: "감사함에 가슴이 벅차올랐다" },
    { word: "경이롭다", pron: "gyeong-i-rop-da", type: "형용사", short: "경외감이 일 만큼 굉장하다", ex: "자연의 섭리가 경이롭게 느껴졌다" },
    { word: "탄복하다", pron: "tan-bok-ha-da", type: "동사", short: "깊이 감탄하며 인정하다", ex: "그의 솜씨에 탄복을 금치 못했다" },
    { word: "감탄하다", pron: "gam-tan-ha-da", type: "동사", short: "마음속 깊이 느끼다", ex: "그 연주에 모두가 감탄했다" },
    { word: "넋을 잃다", pron: "neok-eul il-ta", type: "관용구", short: "정신을 차리지 못하다", ex: "바다 앞에 서자 넋을 잃고 말았다" },
    { word: "경탄하다", pron: "gyeong-tan-ha-da", type: "동사", short: "놀라움으로 감탄하다", ex: "그 작품에 모두가 경탄했다" },
    { word: "매혹되다", pron: "mae-hok-doe-da", type: "동사", short: "완전히 홀려 빠져들다", ex: "그 선율에 매혹되어 발길을 멈췄다" },
    { word: "신비롭다", pron: "sin-bi-rop-da", type: "형용사", short: "불가사의하게 놀랍고 오묘하다", ex: "그 현상이 몹시 신비롭게 느껴졌다" },
    { word: "숭고하다", pron: "sung-go-ha-da", type: "형용사", short: "높고 위대하여 경외감이 든다", ex: "그 희생정신이 숭고하게 느껴졌다" },
    { word: "오묘하다", pron: "o-myo-ha-da", type: "형용사", short: "깊고 신비로운 느낌이 있다", ex: "자연의 이치가 오묘하게 느껴졌다" },
    { word: "압도되다", pron: "ap-do-doe-da", type: "동사", short: "크기나 아름다움에 눌리다", ex: "웅장한 산세에 압도되었다" },
    { word: "찬탄하다", pron: "chan-tan-ha-da", type: "동사", short: "크게 감탄하며 칭찬하다", ex: "모두가 그 연기에 찬탄을 보냈다" },
  ],
  1: [
    { word: "설레다", pron: "seol-le-da", type: "동사", short: "마음이 두근두근 떨리다", ex: "내일이 기다려져 마음이 설렜다" },
    { word: "뭉클하다", pron: "mung-keul-ha-da", type: "동사", short: "가슴 속이 찡하게 울리다", ex: "아이의 한마디에 가슴이 뭉클했다" },
    { word: "흐뭇하다", pron: "heu-mut-ha-da", type: "동사", short: "흡족하여 저절로 미소 짓다", ex: "잘 자라는 모습을 보니 흐뭇했다" },
    { word: "뿌듯하다", pron: "ppu-deut-ha-da", type: "동사", short: "보람으로 가슴이 가득 차오르다", ex: "스스로 해낸 일에 뿌듯함을 느꼈다" },
    { word: "환희하다", pron: "hwan-hui-ha-da", type: "동사", short: "온몸으로 기뻐하다", ex: "우승 소식에 모두가 환희했다" },
    { word: "감격하다", pron: "gam-gyeok-ha-da", type: "동사", short: "마음이 크게 움직이다", ex: "오랜 만남에 감격하여 눈물을 흘렸다" },
    { word: "벅차오르다", pron: "beok-cha-o-reu-da", type: "동사", short: "감동이 넘쳐흐르다", ex: "오랜 꿈을 이루니 벅차올랐다" },
    { word: "충만하다", pron: "chung-man-ha-da", type: "동사", short: "기쁨이 가득 차 넘치다", ex: "아침마다 활력이 충만했다" },
    { word: "고무되다", pron: "go-mu-doe-da", type: "동사", short: "용기와 의욕이 북돋아지다", ex: "응원에 고무되어 더 열심히 했다" },
    { word: "흥겹다", pron: "heung-gyeop-da", type: "형용사", short: "신나고 즐거운 기분이 넘치다", ex: "장단에 맞춰 흥겹게 춤을 췄다" },
    { word: "달뜨다", pron: "dal-tteu-da", type: "동사", short: "기쁨으로 마음이 들뜨다", ex: "소풍 전날 달떠서 잠을 못 잤다" },
    { word: "보람차다", pron: "bo-ram-cha-da", type: "형용사", short: "한 일에 의미와 보람이 가득하다", ex: "보람찬 하루를 마무리했다" },
    { word: "신명나다", pron: "sin-myeong-na-da", type: "동사", short: "흥이 나서 즐겁고 활기차다", ex: "음악이 흐르자 신명이 났다" },
    { word: "두근거리다", pron: "du-geun-geo-ri-da", type: "동사", short: "기대와 설렘으로 심장이 뛰다", ex: "발표 결과를 기다리며 두근거렸다" },
    { word: "활기차다", pron: "hwal-gi-cha-da", type: "동사", short: "생기와 활력이 넘치다", ex: "아이들의 웃음소리에 활기찼다" },
  ],
  2: [
    { word: "서럽다", pron: "seo-reop-da", type: "동사", short: "억울하고 슬퍼 눈물이 날 것 같다", ex: "아무도 몰라주는 것 같아 서러웠다" },
    { word: "사무치다", pron: "sa-mu-chi-da", type: "동사", short: "뼛속까지 깊이 파고들다", ex: "그리움이 가슴 깊이 사무쳤다" },
    { word: "허탈하다", pron: "heo-tal-ha-da", type: "동사", short: "텅 빈 것 같은 무력감에 빠지다", ex: "모든 게 끝나고 나니 허탈했다" },
    { word: "짓누르다", pron: "jit-nu-reu-da", type: "동사", short: "감정이 마음을 강하게 억압하다", ex: "불안이 가슴을 짓눌렀다" },
    { word: "울적하다", pron: "ul-jeok-ha-da", type: "동사", short: "마음이 무겁고 우울해지다", ex: "흐린 하늘을 보니 울적해졌다" },
    { word: "낙담하다", pron: "nak-dam-ha-da", type: "동사", short: "기운과 의욕이 크게 떨어지다", ex: "결과를 보고 크게 낙담했다" },
    { word: "고독하다", pron: "go-dok-ha-da", type: "동사", short: "외롭고 쓸쓸한 느낌에 잠기다", ex: "군중 속에서도 고독함을 느꼈다" },
    { word: "망연자실하다", pron: "mang-yeon-ja-sil-ha-da", type: "동사", short: "충격으로 멍하니 정신을 잃다", ex: "소식을 듣고 망연자실했다" },
    { word: "처연하다", pron: "cheo-yeon-ha-da", type: "형용사", short: "슬프고 쓸쓸하여 애처롭다", ex: "홀로 앉은 그 모습이 처연했다" },
    { word: "무기력하다", pron: "mu-gi-ryeok-ha-da", type: "형용사", short: "힘과 의욕이 완전히 빠지다", ex: "실패 후 한동안 무기력했다" },
    { word: "애달프다", pron: "ae-dal-peu-da", type: "형용사", short: "안타깝고 슬퍼 가슴이 아프다", ex: "그 사연이 애달프게 느껴졌다" },
    { word: "절망하다", pron: "jeol-mang-ha-da", type: "동사", short: "희망을 완전히 잃어버리다", ex: "거듭된 실패에 절망하고 말았다" },
    { word: "비통하다", pron: "bi-tong-ha-da", type: "형용사", short: "슬픔이 너무 커서 가슴이 아프다", ex: "이별 소식에 비통함을 금치 못했다" },
    { word: "허전하다", pron: "heo-jeon-ha-da", type: "형용사", short: "무언가 빠진 듯 텅 빈 느낌이다", ex: "친구가 떠난 뒤 몹시 허전했다" },
    { word: "쓸쓸하다", pron: "sseul-sseul-ha-da", type: "형용사", short: "외롭고 허전하여 마음이 허하다", ex: "빈 집에 돌아오니 쓸쓸했다" },
  ],
};

const CATS = [
  { id: 0, name: "감탄의 말", color: "#f0e6d3", accent: "#6b4f1a", shadow: "rgba(180,130,60,0.22)" },
  { id: 1, name: "긍정의 말", color: "#cfe8d4", accent: "#1a5c2e", shadow: "rgba(60,150,80,0.18)" },
  { id: 2, name: "부정의 말", color: "#d4d8ee", accent: "#2e3470", shadow: "rgba(60,70,140,0.16)" },
];

const SERIF = "'Noto Serif KR', 'Noto Serif', Georgia, 'Times New Roman', serif";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [ci, setCi] = useState(0);
  const [words, setWords] = useState(null);
  const [wi, setWi] = useState([0, 0, 0]);
  const [animKey, setAnimKey] = useState(0);
  const [exiting, setExiting] = useState(null);
  const busy = useRef(false);
  const cardRef = useRef(null);
  const touchRef = useRef({ x: 0, y: 0, isH: null, moved: false });
  const mouseRef = useRef({ x: 0, active: false, dx: 0 });

  useEffect(() => {
    setWords({
      0: shuffle(POOL[0]).slice(0, 10),
      1: shuffle(POOL[1]).slice(0, 10),
      2: shuffle(POOL[2]).slice(0, 10),
    });
  }, []);

  if (!words) return (
    <div style={{ width: "100%", height: "100vh", background: "#ece8e0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 13, color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em" }}>
      불러오는 중…
    </div>
  );

  const cat = CATS[ci];
  const nextCat = CATS[(ci + 1) % 3];
  const nextNextCat = CATS[(ci + 2) % 3];
  const w = words[ci][wi[ci]];

  const bumpWord = () => {
    setWi(p => { const n = [...p]; n[ci] = (n[ci] + 1) % words[ci].length; return n; });
    setAnimKey(k => k + 1);
  };

  const swipe = (dir) => {
    if (busy.current) return;
    busy.current = true;
    setExiting(dir);
    setTimeout(() => {
      setCi(p => (p + 1) % 3);
      setAnimKey(k => k + 1);
      setExiting(null);
      busy.current = false;
    }, 320);
  };

  const onTS = e => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, isH: null, moved: false }; };
  const onTM = e => {
    const dx = e.touches[0].clientX - touchRef.current.x;
    const dy = e.touches[0].clientY - touchRef.current.y;
    if (touchRef.current.isH === null) touchRef.current.isH = Math.abs(dx) > Math.abs(dy) + 5;
    if (touchRef.current.isH) {
      e.preventDefault();
      touchRef.current.moved = true;
      if (cardRef.current) { cardRef.current.style.transition = "none"; cardRef.current.style.transform = `translateX(${dx * .42}px) rotate(${dx * .02}deg)`; }
    }
  };
  const onTE = e => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (cardRef.current) { cardRef.current.style.transition = ""; cardRef.current.style.transform = ""; }
    if (touchRef.current.isH && Math.abs(dx) > 55) swipe(dx < 0 ? "left" : "right");
    else if (!touchRef.current.moved) bumpWord();
  };
  const onMD = e => {
    mouseRef.current = { x: e.clientX, active: true, dx: 0 };
    const mv = ev => {
      if (!mouseRef.current.active) return;
      mouseRef.current.dx = ev.clientX - mouseRef.current.x;
      if (cardRef.current) { cardRef.current.style.transition = "none"; cardRef.current.style.transform = `translateX(${mouseRef.current.dx * .42}px) rotate(${mouseRef.current.dx * .02}deg)`; }
    };
    const up = () => {
      mouseRef.current.active = false;
      if (cardRef.current) { cardRef.current.style.transition = ""; cardRef.current.style.transform = ""; }
      const dx = mouseRef.current.dx;
      document.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseup", up);
      if (Math.abs(dx) > 55) swipe(dx < 0 ? "left" : "right");
      else if (Math.abs(dx) < 6) bumpWord();
    };
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseup", up);
  };

  const exitStyle = exiting === "left"
    ? { transform: "translateX(-160%) rotate(-14deg)", opacity: 0, transition: "transform 0.28s ease-in, opacity 0.28s ease-in" }
    : exiting === "right"
      ? { transform: "translateX(160%) rotate(14deg)", opacity: 0, transition: "transform 0.28s ease-in, opacity 0.28s ease-in" }
      : { transition: "transform 0.38s cubic-bezier(.22,.68,0,1.15)" };

  return (
    <div style={{ width: "100%", height: "100vh", background: "#ece8e0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", userSelect: "none", fontFamily: SERIF, boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
      `}</style>

      {/* 배경 */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 15% 15%,rgba(255,220,160,0.22) 0%,transparent 55%),radial-gradient(ellipse 60% 70% at 90% 85%,rgba(180,200,230,0.18) 0%,transparent 55%)", pointerEvents: "none" }} />

      {/* 로고 */}
      <div style={{ position: "absolute", top: 24, fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", color: "rgba(40,30,20,0.42)", fontFamily: SERIF, zIndex: 10 }}>말의 정원</div>

      {/* 전체화면 터치 */}
      <div onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE} onMouseDown={onMD}
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>

        <div style={{ position: "relative", width: "min(300px,82vw)", height: "min(430px,68vh)" }}>

          {/* 뒷 카드 2 */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: `linear-gradient(158deg,${nextNextCat.color},${nextNextCat.color}bb)`, transform: "rotate(-2.8deg) translate(-9px,-18px)", boxShadow: "0 6px 20px rgba(0,0,0,0.07)", pointerEvents: "none" }} />

          {/* 뒷 카드 1 */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: `linear-gradient(158deg,${nextCat.color},${nextCat.color}cc)`, transform: "rotate(3.8deg) translate(11px,-10px)", boxShadow: "0 12px 36px rgba(0,0,0,0.09)", pointerEvents: "none" }} />

          {/* 메인 카드 */}
          <div ref={cardRef} style={{
            position: "absolute", inset: 0, borderRadius: 22,
            background: `linear-gradient(158deg,${cat.color} 0%,${cat.color}cc 100%)`,
            boxShadow: `0 22px 60px ${cat.shadow},0 4px 14px rgba(0,0,0,0.09),inset 0 2px 18px rgba(255,255,255,0.55),inset 0 -2px 10px rgba(0,0,0,0.05)`,
            zIndex: 20, padding: "44px 32px 32px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            ...exitStyle
          }}>
            {/* 상단 크리즈 */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "22px 22px 0 0", background: "rgba(0,0,0,0.05)" }} />

            {/* 좌상단: 카테고리 */}
            <div style={{
              position: "absolute", top: 18, left: 20,
              fontSize: 11, fontFamily: SERIF, fontWeight: 500,
              letterSpacing: "0.12em", color: cat.accent, opacity: 0.6,
            }}>
              {cat.name}
            </div>

            {/* 우상단: 품사 */}
            <div style={{
              position: "absolute", top: 18, right: 20,
              fontSize: 11, fontFamily: SERIF, fontWeight: 500,
              letterSpacing: "0.12em", color: cat.accent, opacity: 0.6,
            }}>
              {w.type}
            </div>

            {/* 단어 본문 */}
            <div key={animKey} style={{ textAlign: "center", animation: "fadeUp 0.25s ease forwards", width: "100%" }}>
              {/* 메인 단어 */}
              <div style={{
                fontFamily: SERIF,
                fontSize: "clamp(30px,8.5vw,40px)",
                fontWeight: 700,
                color: cat.accent,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                marginBottom: 8,
              }}>{w.word}</div>

              {/* 영어 발음 */}
              <div style={{
                fontFamily: SERIF,
                fontSize: 11,
                color: cat.accent,
                opacity: 0.4,
                letterSpacing: "0.08em",
                marginBottom: 14,
                fontStyle: "italic",
              }}>{w.pron}</div>

              {/* 뜻 */}
              <div style={{
                fontSize: 13,
                color: cat.accent,
                opacity: 0.62,
                marginBottom: 18,
                fontFamily: SERIF,
              }}>{w.short}</div>

              <div style={{ width: 26, height: 1.5, background: cat.accent, opacity: 0.2, borderRadius: 2, margin: "0 auto 18px" }} />

              {/* 예문 */}
              <div style={{
                fontSize: 12,
                color: cat.accent,
                opacity: 0.48,
                fontStyle: "italic",
                lineHeight: 1.75,
                padding: "0 6px",
                fontFamily: SERIF,
              }}>"{w.ex}"</div>
            </div>

            {/* 카운터 */}
            <div style={{ position: "absolute", right: 22, bottom: 20, fontSize: 11, color: cat.accent, opacity: 0.36, fontFamily: SERIF }}>{wi[ci] + 1}/{words[ci].length}</div>
          </div>
        </div>
      </div>

      {/* 하단 안내 */}
      <div style={{ position: "absolute", bottom: 24, fontSize: 11, color: "rgba(0,0,0,0.26)", letterSpacing: "0.04em", zIndex: 10, fontFamily: SERIF }}>
        카드를 좌우로 쓸어넘기거나 터치해보세요
      </div>
    </div>
  );
}
import { useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CardCompornent from "@/components/card";
import NextLink from "next/link";
import FallModel from "@/components/fallModel";

function Model() {
  const gltf = useGLTF("/glb/ichihara.glb");

  gltf.scene.position.z = -1;
  gltf.scene.position.y = 0.5;
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const existingMaterial = child.material;
      const newMaterial = new MeshStandardMaterial({
        map: existingMaterial.map, // 元のテクスチャを保持
        color: existingMaterial.color, // 元の色を保持
        roughness: 0.2,
        metalness: 0.9,
      });
      child.material = newMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  useFrame((state) => {
    gltf.scene.rotation.y += 0.01;
  });
  return <primitive object={gltf.scene} />;
}

export default function Home() {
  const modelRef = useRef(null);
  const [mainData, setMainData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedData2, setSelectedData2] = useState([]);
  const contentRef = useRef(null);
  // 最初のマウント時にデータをフェッチ
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getJobList");
      const data = await response.json();
      setMainData(data);
      setSelectedData(data);
      setSelectedData2(data);
    }
    fetchData();

    const lines = document.querySelectorAll(".line");
    let currentLine = 0;

    lines[currentLine].classList.add("active");
    const setActiveLine = (index) => {
      lines.forEach((line) => line.classList.remove("active"));
      lines[index].classList.add("active");
    };

    setActiveLine(currentLine);

    lines.forEach((line, index) => {
      ScrollTrigger.create({
        trigger: line,
        start: "bottom center",
        end: "bottom center",
        onEnter: () => {
          if (index < lines.length - 1) {
            currentLine = index + 1;
            setActiveLine(currentLine);
          }
        },
        onEnterBack: () => {
          if (index > 0) {
            currentLine = index - 1;
            setActiveLine(currentLine);
          }
        },
      });
    });
  }, []);

  const handleButtonClick = (event) => {
    const regionValue = event.target.value;
    const button = document.querySelector(".region-active");
    button?.classList.remove("region-active");
    event.target.classList.add("region-active");
    const filteredData = mainData.filter((item) => item.region === regionValue);

    // 求人情報のアニメーション
    gsap.to(contentRef.current, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        setSelectedData(filteredData);
        // 新しいデータで再表示
        gsap.to(contentRef.current, {
          duration: 0.5,
          opacity: 1,
        });
      },
    });
  };

  const handleButtonClick2 = (event) => {
    const industryValue = event.target.value;
    const button = document.querySelector(".industry-active");
    button?.classList.remove("industry-active");
    event.target.classList.add("industry-active");
    const filteredData = mainData.filter(
      (item) => item.industry === industryValue
    );

    // 求人情報のアニメーション
    gsap.to(".industry-list", {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        setSelectedData2(filteredData);
        // 新しいデータで再表示
        gsap.to(".industry-list", {
          duration: 0.5,
          opacity: 1,
        });
      },
    });
  };

  const regions = [
    { name: "市原", value: "Ichihara" },
    { name: "ちはら台", value: "Chiharadai" },
    { name: "市津", value: "Shizu" },
    { name: "国分寺台", value: "Kokubunjidai" },
    { name: "五井", value: "Goi" },
    { name: "姉崎", value: "Anesaki" },
    { name: "三和", value: "Sanwa" },
    { name: "有秋", value: "Yusyu" },
    { name: "南総", value: "Nansou" },
    { name: "加茂", value: "Kamo" },
  ];

  const industries = [
    { name: "サービス業", value: "Service" },
    { name: "建設業", value: "Construction" },
    { name: "美容院", value: "hairSalon" },
    { name: "飲食業", value: "Restaurant" },
    { name: "保育", value: "Childcare" },
  ];
  return (
    <>
      <section>
        <div className="flex flex-wrap mt-20 justify-center items-center  xl:h-screen relative fade-group">
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 md:h-full h-[400px] relative">
            <Canvas className="w-full md:h-full  absolute top-0 left-0">
              <ambientLight intensity={10} />
              <spotLight position={[0, 10, 10]} />
              <Model />
            </Canvas>
          </div>
          <div className="inset-0 w-fit h-fit">
            <h1 className="md:text-8xl sm:text-6xl text-4xl font-bold text-center">
              いちはら × WORK
              <br />
              <p className="md:text-6xl sm:text-5xl text-3xl font-bold sm:py-9 py-5">
                ||{" "}
              </p>
              いちワク
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="xl:mt-24 fade-group mt-[200px]">
          <h2 className="text-center font-bold md:text-6xl text-5xl pb-12">
            ABOUT US
          </h2>
        </div>
        <div className="relative">
          {/* <div className="absolute">
            <FallModel />
          </div> */}
          <div className="max-w-7xl m-auto md:text-2xl text-[16px] fade-group">
            <div className="content text-right">
              <div className="line xl:text-right text-center">
                当サイトでは、
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                幅広い分野の求人を提供し、
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                市原市での働き方を
                <br className="xl:hidden" />
                全く新しい視点から探求します。
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                どんな夢を抱いていても、
                <br className="xl:hidden" />
                どんなキャリアを目指していても、
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                ここ市原市で
                <br className="xl:hidden" />
                その実現のチャンスを見つけましょう。
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                「いちはらで働こう！」
                <br className="xl:hidden" />
                という一歩を踏み出す勇気、
              </div>
              <div className="line md:pt-14 pt-8 xl:text-right text-center">
                私たちは
                <br className="xl:hidden" />
                あなたと共にその先へ進むお手伝いをします。
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-52">
          <h2 className="text-center font-bold pb-36 fade-group md:text-6xl text-5xl">
            求人情報
          </h2>
        </div>
        <div>
          <h3 className="pb-10 text-2xl text-center font-bold fade-group">
            地域から探す
          </h3>
          <div className="text-lg text-lg leading-7 flex justify-center max-w-screen-xl mx-auto flex-wrap items-center gap-5 pb-10 fade-group">
            {regions.map((region) => (
              <button
                key={region.value}
                value={region.value}
                onClick={handleButtonClick}
                className="region-button w-36 text-center border border-solid rounded-full py-1 inline-block border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:transition-all"
              >
                {region.name}
              </button>
            ))}
          </div>
          <div
            className="min-h-[413px] flex justify-center items-center fade-group"
            ref={contentRef}
          >
            {selectedData.length === 0 ? (
              <p>求人情報はまだありません</p>
            ) : (
              <CardCompornent job={selectedData.slice(0, 3)} />
            )}
          </div>
          <div className="flex justify-center my-20">
            <NextLink
              className="text-lg w-64 text-center bg-green-500 text-white rounded-full py-4 hover:text-green-500 hover:bg-white border border-green-500"
              href="/discover"
            >
              もっとみる
            </NextLink>
          </div>
        </div>
        <div className="mt-52">
          <h3 className="pb-10 text-2xl text-center font-bold fade-group">
            職種から探す
          </h3>
          <div className="text-lg text-lg leading-7 flex justify-center max-w-screen-xl mx-auto flex-wrap items-center gap-5 pb-10 fade-group">
            {industries.map((industry) => (
              <button
                key={industry.value}
                value={industry.value}
                onClick={handleButtonClick2}
                className="industry-button w-36 text-center border border-solid rounded-full py-1 inline-block border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:transition-all"
              >
                {industry.name}
              </button>
            ))}
          </div>
          <div className="min-h-[413px] flex justify-center items-center fade-group industry-list">
            {selectedData2.length === 0 ? (
              <p>求人情報はまだありません</p>
            ) : (
              <CardCompornent job={selectedData2.slice(0, 3)} />
            )}
          </div>
          <div className="flex justify-center my-20">
            <NextLink
              className="text-lg w-64 text-center bg-green-500 text-white rounded-full py-4 hover:text-green-500 hover:bg-white border border-green-500"
              href="/discover"
            >
              もっとみる
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
}

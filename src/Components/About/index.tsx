"use client"

import styles from "@/Components/About/about.module.scss";
import Image from "next/image";
import Link from "next/link";
import web_dev from "@/app/assets/web-dev.jpg";
import gr_dev from "@/app/assets/gr-dev.jpg";
import DD from "@/app/assets/DD_black.svg";
import background_about from "@/app/assets/background_about.png";
import Logo_Pattert from "@/app/assets/pattern_logo_white.svg";
import dragon from "@/app/assets/dragon_pattern_white.png"

import { useState } from "react";

const About = () => {

  const [selectedPerson, setSelectedPerson] = useState('boris')
  const [selectedTab, setSelectedTab] = useState<'main' | 'history' | 'aspiration'>('main')

  const handleInfoCompany = (tab: 'main' | 'history' | 'aspiration') => {
    setSelectedTab(tab)
  }

  const handlePerson = (person: string) => {
    setSelectedPerson(person)
  }

  const tabContent: {main: string; history: string; aspiration: string}  = {
    main: `Студия Dracarys Design. Место, где каждая идея превращается в нечто грандиозное. 
           Мы вдохновились силой и эстетикой драконов, чтобы создавать уникальные и эффектные 
           работы, которые не только будут привлекать внимание, но и запомнятся вам надолго! 
           Каждая работа — это симбиоз креатива, смелости и технологии, воплощенный в дизайне, 
           который выделяет нас среди других. В "Dracarys Design" мы не просто творим, 
           мы зажигаем наш бренд огнем креативности!`,
    history: `Студия Dracarys Design. Место, где каждая идея превращается в нечто грандиозное. 
           Мы вдохновились силой и эстетикой драконов, чтобы создавать уникальные и эффектные 
           работы, которые не только будут привлекать внимание, но и запомнятся вам надолго! 
           Каждая работа — это симбиоз креатива, смелости и технологии, воплощенный в дизайне, 
           который выделяет нас среди других. В "Dracarys Design" мы не просто творим, 
           мы зажигаем наш бренд огнем креативности!Студия Dracarys Design. Место, где каждая идея превращается в нечто грандиозное. 
           Мы вдохновились силой и эстетикой драконов, чтобы создавать уникальные и эффектные 
           работы, которые не только будут привлекать внимание, но и запомнятся вам надолго! 
           Каждая работа — это симбиоз креатива, смелости и технологии, воплощенный в дизайне, 
           который выделяет нас среди других. В "Dracarys Design" мы не просто творим, 
           мы зажигаем наш бренд огнем креативности!`,
    aspiration: ``
  };

  return (
    <section id="about" className={styles.section2}>
      <Image alt="background_about" src={background_about}/>
      <div className={styles.blackout}></div>
      <div className={styles.wrapper_about}>
        <Image src={dragon} alt=""/>
        <div>
          <h2>История возникновения</h2>
          <hr/>
        </div>
        <div className={styles.about_company}>
            <div className={styles.tabs}>
              <div onClick={()=>handleInfoCompany('main')} className={selectedTab === 'main' ? styles.active_tab : ''}></div>
              <div onClick={()=>handleInfoCompany('history')} className={selectedTab === 'history' ? styles.active_tab : ''}></div>
              <div onClick={()=>handleInfoCompany('aspiration')} className={selectedTab === 'aspiration' ? styles.active_tab : ''}></div>
            </div>
            <div className={styles.content}>
              <p>{tabContent[selectedTab]}</p>
              <Image src={DD} alt="title"/>
            </div>
        </div>
        <div className={styles.switches}>
          <div>
            <div className={`${styles.switch_img} ${selectedPerson === 'boris' ? styles.active_swith : ""}`} onClick={()=>handlePerson('boris')}>
              <Image src={web_dev} alt="boris"/>
            </div>
            <Link href={"https://t.me/boris_zunnunov"}>@boris_zunnunov</Link>
          </div>
          <div>
            <div className={`${styles.switch_img} ${selectedPerson === 'lilia' ? styles.active_swith : ""}`} onClick={()=>handlePerson('lilia')}>
              <Image src={gr_dev} alt="lilia"/>
            </div>
            <Link href={"https://t.me/liliasnef310103"}>@liliasnef310103</Link>
          </div>
        </div>
        <div className={styles.about_info}>
          <div className={styles.background}></div>
          <Image src={Logo_Pattert} alt="dragon"></Image>
          <div className={styles.info}>
            <div className={styles.label}></div>
            {selectedPerson === 'boris' ? (
              <div className={styles.person}>
                <h3>Борис Зуннунов</h3>
                <p>Полный цикл разработки web-приложений. 
                  Начиная от создания дизайна и тщательного архитектурного проектирования, 
                  заканчивая разработкой и реализацией сложных технических решений.
                </p>
              </div>
            ) : (
              <div className={styles.person}>
                <h3>Лилия Нефёдова</h3>
                <p>Комплексная упаковка бренда (фирменный стиль, логотип, нейминг, 
                  носители айдентики и их реализация). Создание визуальных решений 
                  для брендов и их маштабирование. 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
import React, {useEffect, useState} from "react";
import styles from "./HomeNavBar.module.css";
import {AlertFilled, CompassFilled, ContainerFilled, HomeFilled, QuestionCircleFilled} from "@ant-design/icons";
import AppText from "../AppText/AppText";

const HomeNavBar: React.FC = () => {
  const [selected, setSelected] = useState(1)
  const [navBarContainerStyle, setNavBarContainerStyle] = useState(`${styles.navBarContainer}`)

  const handleSelected = (currentIndex: number) => {
    setSelected(currentIndex)
  }

  const changeStyle = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 66) {
      setNavBarContainerStyle(`${styles.navBarContainer} ${styles.navBarContainerWhenScroll}`)
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', changeStyle)

    return () => window.removeEventListener('scroll', changeStyle)
  }, [])

  return (
    <div className={navBarContainerStyle}>
      {NAV_BAR.map((item) => {
        return (
          <div
            onClick={() => handleSelected(item.id)}
            key={item.id}
            className={
              selected !== item.id
                ? styles.itemContainer
                : styles.itemContainerSelected
            }>
            <div className={styles.icon}>{item.icon}</div>
            <AppText className={styles.title}>{item.title}</AppText>
          </div>
        )
      })}
    </div>
  )
}

export default HomeNavBar


const NAV_BAR = [{
  id: 1,
  title: "Home",
  icon: <HomeFilled/>
}, {
  id: 2,
  title: "Lộ trình",
  icon: <CompassFilled/>
}, {
  id: 3,
  title: "Học",
  icon: <AlertFilled/>
}, {
  id: 4,
  title: "Blog",
  icon: <ContainerFilled/>
}, {
  id: 5,
  title: "Hỏi đáp",
  icon: <QuestionCircleFilled/>
}]

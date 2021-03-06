import { useState, useEffect } from 'react'

import ProfileCard from '@components/ProfileCard'

import useAppContext from '@contexts/App'

import * as styles from './ProfileInfo.module.css'

const ProfileInfo = ({ children }) => {
  const { selectedFeature } = useAppContext()
  const [expanded, setExpanded] = useState()

  useEffect(() => {
    if (selectedFeature.profiles) {
      setExpanded(0)
    } else {
      setExpanded()
    }
  }, [selectedFeature])

  const toggle = (i) => () => {
    setExpanded(i)
  }

  if (selectedFeature.profiles) {
    return (
      <div>
        <h2 className={styles.title}>{selectedFeature.location}</h2>
        {selectedFeature.profiles.map((profile, i) => (
          <div
            key={profile.uid}
            className={[
              styles.item,
              expanded === i ? styles.expandedItem : styles.item
            ].join(' ')}
          >
            <h3
              className={styles.button}
              onClick={toggle(i)}
            >
              {profile.name}
            </h3>
            <div className={styles.content}>
              <ProfileCard profile={profile} inAccordion />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ProfileCard profile={selectedFeature} />
  )
}

export default ProfileInfo

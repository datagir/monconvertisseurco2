import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import PauseIcon from 'components/base/icons/pause'
import PlayIcon from 'components/base/icons/play'
import styles from './Progress.module.css'

const Progress = ({
  length,
  setFadeIn,
  setToDisplay,
}: {
  length: number
  setFadeIn: Dispatch<SetStateAction<boolean>>
  setToDisplay: Dispatch<SetStateAction<number>>
}) => {
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const displayedTimeoutRef = useRef<NodeJS.Timeout>()
  const fadeInTimeoutRef = useRef<NodeJS.Timeout>()

  const updateWithTimeout = useCallback(() => {
    setProgress((value) => value + 1)
    displayedTimeoutRef.current = setTimeout(updateWithTimeout, 50)
  }, [])

  useEffect(() => {
    if (paused) {
      if (displayedTimeoutRef.current) {
        clearTimeout(displayedTimeoutRef.current)
      }

      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current)
      }
    } else {
      displayedTimeoutRef.current = setTimeout(updateWithTimeout, 50)
    }
  }, [paused])

  useEffect(() => {
    if (progress > 99) {
      clearTimeout(displayedTimeoutRef.current)
      setFadeIn(true)
      fadeInTimeoutRef.current = setTimeout(() => {
        setFadeIn(false)
        setToDisplay((value) => (value + 1) % length)
        setProgress(0)
        setTimeout(updateWithTimeout, 1000)
      }, 1000)

      return () => {
        if (fadeInTimeoutRef.current) {
          clearTimeout(fadeInTimeoutRef.current)
        }
      }
    }
  }, [progress])

  return (
    <>
      <div className={styles.border} />
      <div
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
        }}>
        <progress value={progress} className={styles.progress} max={100}>
          {progress}%
        </progress>
      </div>
      <button title={paused ? 'Play' : 'Pause'} className={styles.button} onClick={() => setPaused(!paused)}>
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </>
  )
}

export default Progress

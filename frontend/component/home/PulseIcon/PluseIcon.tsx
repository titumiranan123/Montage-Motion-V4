import styles from "./Pluseicon.module.css";

const PluseIcon = () => {
  return (
    <div className="z-10">
      <button
        id="play-video"
        className={`${styles.video_play_button} cursor-pointer`}
        aria-label="Play video"
      >
        <span></span>
      </button>
    </div>
  );
};

export default PluseIcon;

interface WinnerBannerProps {
  text: string;
}

const WinnerBanner: React.FC<WinnerBannerProps> = ({ text }) => {
  return <div className="winner-banner">{text}</div>;
};

export default WinnerBanner;

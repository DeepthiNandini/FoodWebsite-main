import { Player } from '@lottiefiles/react-lottie-player';
import Lottie from "../assets/Nofood.json";
export default function Error({ title, message }) {
  return (
    <div >
       <Player
        autoplay
        loop
        src={Lottie}
        className="errorLottie"
      />
      <h2 className="error">{title}</h2>
      <p>{message}
      </p>
      
    </div>
  );
}

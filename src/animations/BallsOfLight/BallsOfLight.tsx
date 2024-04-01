
import style from './BallsOfLight.module.css'

export const BallsOfLight = () => {
    return (
        <div className={style.glowContainer}>


    {/*        style="--delay:-12s;--size:0.35;--speed:25s;"></div>*/}
    {/*<div class="ball" style="--delay:-10s;--size:0.3;--speed:15s;"></div>*/}
            <div style={{animationDelay : '9s'  }} className={style.ball}></div>
            <div style={{animationDuration : '6s'}} className={style.ball}></div>
            <div style={{animationDuration : '3s'}} className={style.ball}></div>
            <div style={{animationDuration : '4s'}} className={style.ball + style.bright }></div>
            <div className={style.ball}></div>
        </div>
    )
}

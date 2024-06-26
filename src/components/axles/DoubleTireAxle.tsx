import { Llanta } from "../../models/Workshop";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const DoubleTireAxle = ({ eje, fit, presionAxle }: { eje: Llanta[], fit?:boolean, presionAxle?:number}) => {
  return (
    <>
      <div className="tire__container ejes__{cant_ejes|safe}">
        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[0]?.numero_economico} | {eje[0]?.producto_nombre ?? eje[0]?.producto} 
          </div>
          {fit && <ArrowUpwardIcon />}

          <div className={eje[0]?.tipo_de_eje === "SP2" ? "tire tire-sp" : "tire car-tire"}>
            <div className={`tire__tag pos ${eje[0]?.color_middle}`}>
              {eje[0]?.positionString}
            </div>
            <div className={`tire__tag up ${eje[0]?.color_top}`}>
              {eje[0]?.presion ?? eje[0]?.presion_actual}
            </div>
            <span className="icon-llanta-outline"></span>
            <div className={`tire__tag down ${eje[0]?.color_buttom}`}>
              {eje[0]?.profundidad_central ?? 1}
            </div>
          </div>
        </div>

        <div
          className="axle"
          style={{ display: eje[0]?.tipo_de_eje === "SP2" ? "none" : "" }}
        >
          <span className="mb-[1rem] ">{eje[0]?.dimension}</span>
          <div className="shaft"><p className="mt-[-8px] z-20 bg-white rounded-full h-[22px] w-[30px] text-center border-[1px] border-black">{eje[0].tipo_de_eje}</p></div>
          <span  className="mt-[1rem]">{presionAxle ? `${presionAxle} PSI` : ``}</span>
        </div>

        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[1]?.numero_economico} | {eje[0]?.producto_nombre ?? eje[0]?.producto} 
          </div>
          {fit && <ArrowUpwardIcon />}
          
          <div className={eje[1]?.tipo_de_eje === "SP2" ? "tire tire-sp" : "tire car-tire"}>
            <div className={`tire__tag pos ${eje[1]?.color_middle}`}>
              {eje[1]?.positionString}
            </div>
            <div className={`tire__tag up ${eje[1]?.color_top}`}>
            {eje[1]?.presion ?? eje[1]?.presion_actual}

            </div>
            <span className="icon-llanta-outline"></span>
            <div className={`tire__tag down ${eje[1]?.color_buttom}`}>
              {eje[1]?.profundidad_central ?? 1}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoubleTireAxle;

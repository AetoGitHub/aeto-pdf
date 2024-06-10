import { Llanta } from "../models/Workshop";

const DoubleTireAxle = ({eje} : {eje:Llanta[]}) => {
  return (
    <>
      <div className="tire__container ejes__{cant_ejes|safe}">
        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[0]?.numero_economico} | {eje[0]?.producto} 
          </div>
          <div className="tire">
            <div className={`tire__tag pos ${eje[0]?.color_top}`}>
              {eje[0]?.positionString}
            </div>
            <div className={`tire__tag up ${eje[0]?.color_middle}`}>
              {eje[0]?.presion_actual}
            </div>
            <span className="icon-llanta-outline"></span>
            <div className={`tire__tag good down ${eje[0]?.color_buttom}`}>
              {eje[0]?.profundidad_central ?? 1}
            </div>
          </div>
        </div>

        <div
          className="axle"
          style={{ display: eje[0]?.tipo_de_eje === "SP" ? "none" : "" }}
        >
          <span>{eje[0]?.presion_actual}</span>
          <div className="shaft"></div>
          {/* <span>{eje[0]?.producto}</span> */}
        </div>

        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[1]?.numero_economico} | {eje[1]?.producto}
          </div>
          <div className="tire">
            <div className={`tire__tag pos ${eje[1]?.color_top}`}>
              {eje[1]?.positionString}
            </div>
            <div className={`tire__tag up ${eje[1]?.color_middle}`}>
              {eje[1]?.presion_actual}
            </div>
            <span className="icon-llanta-outline"></span>
            <div className={`tire__tag good down ${eje[1]?.color_buttom}`}>
              {eje[1]?.profundidad_central}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoubleTireAxle;

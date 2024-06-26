import { Llanta } from "../../models/Workshop";

const SingleTireAxle = ({ eje }: { eje: Llanta[] }) => {
  return (
    <div className="tire__container ejes__1">
      <div className="tire__content">
        <div className="tire__economic-top">
          {eje[0]?.numero_economico} |{" "}
          {eje[0]?.producto_nombre ?? eje[0]?.producto}
        </div>
        <div className={eje[0]?.tipo_de_eje === "SP1" ? "tire tire-sp" : "tire car-tire"}>
          <div className={`tire__tag pos ${eje[0]?.color_middle}`}>
            {eje[0]?.positionString}
          </div>
          <div className={`tire__tag up ${eje[0]?.color_top}`}>
            {eje[0]?.presion ?? eje[0]?.presion_actual}
          </div>
          <span className="icon-llanta-outline "></span>
          <div className={`tire__tag down ${eje[0]?.color_buttom}`}>
            {eje[0]?.profundidad_central ?? 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTireAxle;

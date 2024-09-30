import { Llanta } from "../../../models/Workshop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const DoubleTireAxle = ({
  eje,
  fit,
  presionAxle,
}: {
  eje: Llanta[];
  fit?: boolean;
  presionAxle?: number;
}) => {
  return (
    <>
      <div className="tire__container ejes__{cant_ejes|safe}">
        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[0]?.desmontar_numero_economico ??
              eje[0]?.rotar_numero_economico ??
              eje[0].numero_economico}{" "}
            |{" "}
            {eje[0]?.desmontar_producto_nombre ??
              eje[0]?.rotar_producto_nombre ??
              eje[0]?.producto_nombre ??
              eje[0]?.producto}
          </div>
          {fit && <ArrowUpwardIcon />}

          <div
            className={
              eje[0]?.tipo_de_eje === "SP2" ? "tire tire-sp" : "tire car-tire"
            }
          >
            <div
              className={`tire__tag pos ${
                eje[0]?.color_medio_desmontar ??
                eje[0]?.color_medio_rotar ??
                eje[0]?.color_medio
              }`}
            >
              {eje[0]?.positionString}
            </div>
            <div
              className={`tire__tag up ${
                eje[0]?.color_presion_desmontar ??
                eje[0]?.color_presion_rotar ??
                eje[0]?.color_presion
              }`}
            >
              {(eje[0].desmontar_presion_salida ??
                eje[0].rotar_presion_salida ??
                eje[0].presion_salida) === 9260
                ? "---"
                : eje[0].desmontar_presion_salida ??
                  eje[0].rotar_presion_salida ??
                  eje[0].presion_salida}
            </div>
            <span className="icon-llanta-outline"></span>
            <div
              className={`tire__tag down ${
                eje[0]?.color_profundidad_desmontar ??
                eje[0]?.color_profundidad_rotar ??
                eje[0]?.color_profundidad
              }`}
            >
              {eje[0].desmontar_min_profundidad ??
                eje[0].rotar_min_profundidad ??
                eje[0].min_profundidad}
            </div>
          </div>
        </div>

        <div
          className="axle"
          style={{ display: eje[0]?.tipo_de_eje === "SP2" ? "none" : "" }}
        >
          <span className="mb-[1rem] ">{eje[0]?.dimension}</span>
          <div className="shaft">
            <p className="mt-[-8px] z-20 bg-white rounded-full h-[22px] w-[30px] text-center border-[1px] border-black">
              {eje[0].tipo_de_eje}
            </p>
          </div>
          <span className="mt-[1rem]">
            {presionAxle ? `${presionAxle} PSI` : ``}
          </span>
        </div>

        <div className="tire__content">
          <div className="tire__economic-top">
            {eje[1]?.desmontar_numero_economico ??
              eje[1]?.rotar_numero_economico ??
              eje[1].numero_economico}{" "}
            |{" "}
            {eje[1]?.desmontar_producto_nombre ??
              eje[1]?.rotar_producto_nombre ??
              eje[1]?.producto_nombre ??
              eje[1]?.producto}
          </div>
          {fit && <ArrowUpwardIcon />}

          <div
            className={
              eje[1]?.tipo_de_eje === "SP2" ? "tire tire-sp" : "tire car-tire"
            }
          >
            <div
              className={`tire__tag pos ${
                eje[1]?.color_medio_desmontar ??
                eje[1]?.color_medio_rotar ??
                eje[1]?.color_medio
              }`}
            >
              {eje[1]?.positionString}
            </div>
            <div
              className={`tire__tag up ${
                eje[1]?.color_presion_desmontar ??
                eje[1]?.color_presion_rotar ??
                eje[1]?.color_presion
              }`}
            >
              {(eje[1].desmontar_presion_salida ??
                eje[1].rotar_presion_salida ??
                eje[1].presion_salida) === 9260
                ? "---"
                : eje[1].desmontar_presion_salida ??
                  eje[1].rotar_presion_salida ??
                  eje[1].presion_salida}
            </div>
            <span className="icon-llanta-outline"></span>
            <div
              className={`tire__tag down ${
                eje[1]?.color_profundidad_desmontar ??
                eje[1]?.color_profundidad_rotar ??
                eje[1]?.color_profundidad
              }`}
            >
              {eje[1].desmontar_min_profundidad ??
                eje[1].rotar_min_profundidad ??
                eje[1].min_profundidad}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoubleTireAxle;

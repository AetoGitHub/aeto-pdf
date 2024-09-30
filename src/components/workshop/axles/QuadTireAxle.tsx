import { Llanta } from "../../../models/Workshop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const QuadTireAxle = ({
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
      <div className="tire__container ejes__4">
        <div className="double-tire">
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
            <div className="tire">
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
              <span className="icon-llanta-outline icon-"></span>
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
            {fit && <div className="h-[18px]" />}
          </div>

          <div className="tire__content">
            {fit && <div className="h-[18px]" />}
            <div className="tire">
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
            {fit && <ArrowDownwardIcon />}
            <div className="tire__economic-bottom">
              {eje[1]?.desmontar_numero_economico ??
                eje[1]?.rotar_numero_economico ??
                eje[1].numero_economico}{" "}
              |{" "}
              {eje[1]?.desmontar_producto_nombre ??
                eje[1]?.rotar_producto_nombre ??
                eje[1]?.producto_nombre ??
                eje[1]?.producto}
            </div>
          </div>
        </div>

        <div className="axle">
          <span className="mb-[1rem] ">{eje[0]?.dimension}</span>
          <div className="shaft">
            <p className="mt-[-8px] z-20 bg-white rounded-full h-[22px] w-[30px] text-center border-[1px] border-black">
              {eje[0].tipo_de_eje}
            </p>
          </div>
          <span className="mt-[1rem] ">
            {presionAxle ? `${presionAxle} PSI` : ``}
          </span>
        </div>

        <div className="double-tire">
          {fit && <div className="h-[18px]" />}
          <div className="tire__content">
            <div className="tire__economic-top">
              {eje[2]?.desmontar_numero_economico ??
                eje[2]?.rotar_numero_economico ??
                eje[2].numero_economico}{" "}
              |{" "}
              {eje[2]?.desmontar_producto_nombre ??
                eje[2]?.rotar_producto_nombre ??
                eje[2]?.producto_nombre ??
                eje[2]?.producto}
            </div>
            {fit && <ArrowUpwardIcon />}

            <div className="tire__content">
              <div className="tire">
                <div
                  className={`tire__tag pos ${
                    eje[2]?.color_medio_desmontar ??
                    eje[2]?.color_medio_rotar ??
                    eje[2]?.color_medio
                  }`}
                >
                  {eje[2]?.positionString}
                </div>
                <div
                  className={`tire__tag up ${
                    eje[2]?.color_presion_desmontar ??
                    eje[2]?.color_presion_rotar ??
                    eje[2]?.color_presion
                  }`}
                >
              {(eje[2].desmontar_presion_salida ??
                eje[2].rotar_presion_salida ??
                eje[2].presion_salida) === 9260
                ? "---"
                : eje[2].desmontar_presion_salida ??
                  eje[2].rotar_presion_salida ??
                  eje[2].presion_salida}
                </div>
                <span className="icon-llanta-outline"></span>
                <div
                  className={`tire__tag down ${
                    eje[2]?.color_profundidad_desmontar ??
                    eje[2]?.color_profundidad_rotar ??
                    eje[2]?.color_profundidad
                  }`}
                >
                  {eje[2].desmontar_min_profundidad ??
                    eje[2].rotar_min_profundidad ??
                    eje[2].min_profundidad}
                </div>
              </div>
            </div>
          </div>

          <div className="tire__content">
            {fit && <div className="h-[18px]" />}

            <div className="tire">
              <div
                className={`tire__tag pos ${
                  eje[3]?.color_medio_desmontar ??
                  eje[3]?.color_medio_rotar ??
                  eje[3]?.color_medio
                }`}
              >
                {eje[3]?.positionString}
              </div>
              <div
                className={`tire__tag up ${
                  eje[3]?.color_presion_desmontar ??
                  eje[3]?.color_presion_rotar ??
                  eje[3]?.color_presion
                }`}
              >
              {(eje[3].desmontar_presion_salida ??
                eje[3].rotar_presion_salida ??
                eje[3].presion_salida) === 9260
                ? "---"
                : eje[3].desmontar_presion_salida ??
                  eje[3].rotar_presion_salida ??
                  eje[3].presion_salida}
              </div>
              <span className="icon-llanta-outline"></span>
              <div
                className={`tire__tag down ${
                  eje[3]?.color_profundidad_desmontar ??
                  eje[3]?.color_profundidad_rotar ??
                  eje[3]?.color_profundidad
                }`}
              >
                {eje[3].desmontar_min_profundidad ??
                  eje[3].rotar_min_profundidad ??
                  eje[3].min_profundidad}
              </div>
            </div>

            {fit && <ArrowDownwardIcon />}
            <div className="tire__economic-bottom">
              {eje[3]?.desmontar_numero_economico ??
                eje[3]?.rotar_numero_economico ??
                eje[3].numero_economico}{" "}
              |{" "}
              {eje[3]?.desmontar_producto_nombre ??
                eje[3]?.rotar_producto_nombre ??
                eje[3]?.producto_nombre ??
                eje[3]?.producto}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuadTireAxle;

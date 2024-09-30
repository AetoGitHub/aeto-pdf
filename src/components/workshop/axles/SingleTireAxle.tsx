import { Llanta } from "../../../models/Workshop";

const SingleTireAxle = ({
  eje,
}: {
  eje: Llanta[];
}) => {
  return (
    <div className="tire__container ejes__1">
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
        <div
          className={
            eje[0]?.tipo_de_eje === "SP1" ? "tire tire-sp" : "tire car-tire"
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
            className={`tire__tag up  ${
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
          <span className="icon-llanta-outline "></span>
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
    </div>
  );
};

export default SingleTireAxle;

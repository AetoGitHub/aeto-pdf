import { Llanta, ServiceTire } from '../../../models/Workshop';

const SingleTireAxle = ({
  eje,
  servicesTires,
}: {
  eje: Llanta[];
  servicesTires?: ServiceTire[];
}) => {
  return (
    <div className="tire__container ejes__1">
      <div className="tire__content">
        <div className="tire__economic-top">
          {eje[0]?.numero_economico} |{' '}
          {eje[0]?.producto_nombre ?? eje[0]?.producto}
        </div>
        <div
          className={
            eje[0]?.tipo_de_eje === 'SP1' ? 'tire tire-sp' : 'tire car-tire'
          }
        >
          <div className={`tire__tag pos ${eje[0]?.color_middle}`}>
            {eje[0]?.positionString}
          </div>
          <div className={`tire__tag up ${eje[0]?.color_top}`}>
            {servicesTires?.find((tire) => tire.llanta_original === eje[0].id)
              ?.presion_salida === 9260 ||
            servicesTires?.find((tire) => tire.llanta_original === eje[0].id)
              ?.presion_salida === undefined
              ? '---'
              : servicesTires.find((tire) => tire.llanta_original === eje[0].id)
                  ?.presion_salida ?? "---"}
          </div>
          <span className="icon-llanta-outline "></span>
          <div className={`tire__tag down ${eje[0]?.color_buttom}`}>
            {servicesTires?.find((tire) => tire.llanta_original === eje[0].id)
              ?.min_profundidad ?? eje[0]?.profundidad_central}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTireAxle;

import { Llanta } from '../../models/Workshop';

const SingleTireAxle = ({ eje }: { eje: Llanta[] }) => {
  const getMinProfundidad = (tire: Llanta) => {
    const profundidades = [
      tire.profundidad_central,
      tire.profundidad_derecha,
      tire.profundidad_izquierda,
    ].filter((p) => p !== null && p !== undefined)

    if (profundidades.length === 0) {
      return '---';
    }

    return Math.min(...profundidades);
  };
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
            {!eje[0]?.presion || eje[0]?.presion === 9260 ? "---" : eje[0].presion}
          </div>
          <span className="icon-llanta-outline "></span>
          <div className={`tire__tag down ${eje[0]?.color_buttom}`}>
            {getMinProfundidad(eje[0])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTireAxle;

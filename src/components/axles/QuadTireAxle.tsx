import { Llanta } from '../../models/Workshop';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const QuadTireAxle = ({
  eje,
  fit,
  presionAxle,
}: {
  eje: Llanta[];
  fit?: boolean;
  presionAxle?: number;
}) => {
  const getMinProfundidad = (tire: Llanta) => {
    const profundidades = [
      tire.profundidad_central,
      tire.profundidad_derecha,
      tire.profundidad_izquierda,
    ].filter((p) => p !== null && p !== undefined);

    if (profundidades.length === 0) {
      return '---';
    }

    return Math.min(...profundidades);
  };
  return (
    <>
      <div className="tire__container ejes__4">
        <div className="double-tire">
          <div className="tire__content">
            <div className="tire__economic-top">
              {eje[0]?.numero_economico} |
              {eje[0]?.producto_nombre ?? eje[0]?.producto}
            </div>
            {fit && <ArrowUpwardIcon />}
            <div className="tire">
              <div className={`tire__tag pos ${eje[0]?.color_middle}`}>
                {eje[0]?.positionString}
              </div>
              <div className={`tire__tag up ${eje[0]?.color_top}`}>
                {!eje[0]?.presion || eje[0]?.presion === 9260
                  ? '---'
                  : eje[0].presion}
              </div>
              <span className="icon-llanta-outline icon-"></span>
              <div className={`tire__tag down ${eje[0].color_buttom}`}>
                {getMinProfundidad(eje[0])}
              </div>
            </div>
            {fit && <div className="h-[18px]" />}
          </div>

          <div className="tire__content">
            {fit && <div className="h-[18px]" />}
            <div className="tire">
              <div className={`tire__tag pos ${eje[1]?.color_middle}`}>
                {eje[1]?.positionString}
              </div>
              <div className={`tire__tag up ${eje[1]?.color_top}`}>
                {!eje[1]?.presion || eje[1]?.presion === 9260
                  ? '---'
                  : eje[1].presion}
              </div>
              <span className="icon-llanta-outline"></span>
              <div className={`tire__tag down ${eje[1].color_buttom}`}>
                {getMinProfundidad(eje[1])}
              </div>
            </div>
            {fit && <ArrowDownwardIcon />}
            <div className="tire__economic-bottom ml-[-45px]">
              {eje[1]?.numero_economico} |{' '}
              {eje[1]?.producto_nombre ?? eje[1]?.producto}
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
            <div className="tire__economic-top ml-[-35px]">
              {eje[2]?.numero_economico} |{' '}
              {eje[2]?.producto_nombre ?? eje[2]?.producto}
            </div>
            {fit && <ArrowUpwardIcon />}

            <div className="tire__content">
              <div className="tire">
                <div className={`tire__tag pos ${eje[2]?.color_middle}`}>
                  {eje[2]?.positionString}
                </div>
                <div className={`tire__tag up ${eje[2]?.color_top}`}>
                  {!eje[2]?.presion || eje[2]?.presion === 9260
                    ? '---'
                    : eje[2].presion}
                </div>
                <span className="icon-llanta-outline"></span>
                <div className={`tire__tag down ${eje[2].color_buttom}`}>
                  {getMinProfundidad(eje[2])}
                </div>
              </div>
            </div>
          </div>

          <div className="tire__content">
            {fit && <div className="h-[18px]" />}

            <div className="tire">
              <div className={`tire__tag pos ${eje[3]?.color_middle}`}>
                {eje[3]?.positionString}
              </div>
              <div className={`tire__tag up ${eje[3]?.color_top}`}>
                {!eje[3]?.presion || eje[3]?.presion === 9260
                  ? '---'
                  : eje[3].presion}
              </div>
              <span className="icon-llanta-outline"></span>
              <div className={`tire__tag down ${eje[3].color_buttom}`}>
                {getMinProfundidad(eje[3])}
              </div>
            </div>

            {fit && <ArrowDownwardIcon />}
            <div className="tire__economic-bottom ml-[-65px]">
              {eje[3]?.numero_economico} |{' '}
              {eje[3]?.producto_nombre ?? eje[3]?.producto}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuadTireAxle;

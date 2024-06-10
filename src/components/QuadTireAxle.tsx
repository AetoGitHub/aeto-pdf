import { Llanta } from "../models/Workshop";

const QuadTireAxle = ({eje} : {eje:Llanta[]}) => {
  return (
    <>
        <div className="tire__container ejes__4">
            <div className="double-tire">
            
              <div className="tire__content">
                <div className="tire__economic-top">
                   {eje[0]?.numero_economico} | { eje[0]?.producto }
                </div>
                <div className="tire">
                  <div className={`tire__tag pos ${eje[0]?.color_top}`}>
                    { eje[0]?.positionString }
                  </div>
                  <div className={`tire__tag up ${eje[0]?.color_middle}`}>
                    {eje[0]?.presion_actual}
                  </div>
                  <span className="icon-llanta-outline icon-"></span>
                  <div className={`tire__tag good down ${eje[0].color_buttom}`}>
                    {eje[0]?.profundidad_central}
                  </div>
                </div>
              </div>


              <div className="tire__content">
                <div className="tire">
                <div className={`tire__tag pos ${eje[1]?.color_top}`}>
                    { eje[1]?.positionString }
                  </div>
                  <div className={`tire__tag up ${eje[1]?.color_middle}`}>
                    {eje[1]?.presion_actual}
                  </div>
                  <span className="icon-llanta-outline"></span>
                  <div className={`tire__tag good down ${eje[1].color_buttom}`}>
                    {eje[1]?.profundidad_central}
                  </div>
                </div>
                <div className="tire__economic-bottom">
                  {eje[1]?.numero_economico} | {eje[1]?.producto};
                </div>
              </div>
            </div>

            <div className="axle">
              <span>{eje[0]?.profundidad_central}</span>
              <div className="shaft"></div>
              {/* <span>{ eje[0]?.producto }</span> */}
            </div>

            <div className="double-tire">
              <div className="tire__content">
                <div className="tire__economic-top">
                 {eje[2]?.numero_economico} | {eje[2]?.producto}
                </div>

                <div className="tire__content">
                  <div className="tire">
                  <div className={`tire__tag pos ${eje[2]?.color_top}`}>
                        { eje[2]?.positionString }
                    </div>
                    <div className={`tire__tag up ${eje[2]?.color_middle}`}>
                        {eje[2]?.presion_actual}
                    </div>
                    <span className="icon-llanta-outline"></span>
                    <div className={`tire__tag good down ${eje[2].color_buttom}`}>
                      {eje[2]?.profundidad_central}
                    </div>
                  </div>
                </div>
              </div>

              <div className="tire__content">
                <div className="tire">
                <div className={`tire__tag pos ${eje[3]?.color_top}`}>
                    { eje[3]?.positionString }
                  </div>
                  <div className={`tire__tag up ${eje[3]?.color_middle}`}>
                    {eje[3]?.presion_actual}
                  </div>
                  <span className="icon-llanta-outline"></span>
                  <div className={`tire__tag good down ${eje[3].color_buttom}`}>
                    {eje[3]?.profundidad_central}
                  </div>
                </div>

                <div className="tire__economic-bottom">
                  {eje[3]?.numero_economico} | {eje[3]?.producto}
                </div>
              </div>
            </div>
        </div> 
    </>
  );
};

export default QuadTireAxle;





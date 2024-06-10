import { getTirePosition } from './getTirePosition';
import { Llanta, WorkshopReport, Tire} from '../models/Workshop';

export const getVehicleDiagram = (vehicle: WorkshopReport) => {

  let ejes: Tire[][] = Array.from(
    Array(vehicle.configuracion.configuracion.split('.').length),
    () => []
  );

  let counter: number = 1;

  const tires = vehicle.configuracion.llantas.map((tire: Llanta) => {
    const { posicion, ...restTire } = tire;

    const position = getTirePosition(posicion);

    if (!position) throw Error('Invalid position');

    return {
      ...restTire,
      position,
      positionString: posicion,
    };
  });

  ejes.forEach((eje) => {
    tires.forEach((llanta) => {
      if (llanta.eje === counter) {
        eje.push(llanta as unknown as Tire);
      }
    });
    counter++;
  });

  ejes = ejes.map((eje) => {
    /* Ordenamiento de posiciones */
    if (eje.length === 2) {
      const tempEje: Tire[] = Array(2);
      eje.forEach((llanta) => {
        const pos = llanta.positionString.replace(/\d+/g, '');

        pos === 'LI' ? (tempEje[0] = llanta) : (tempEje[1] = llanta);

        return (eje = tempEje as unknown as Tire[]);
      });
    }

    if (eje.length === 4) {
      const tempEje: Tire[] = Array(4);
      eje.forEach((llanta) => {
        const pos = llanta.positionString.replace(/\d+/g, '');

        switch (pos) {
          case 'LO':
            tempEje[0] = llanta;
            break;
          case 'LI':
            tempEje[1] = llanta;
            break;
          case 'RI':
            tempEje[2] = llanta;
            break;
          case 'RO':
            tempEje[3] = llanta;
            break;
          default:
            break;
        }
        
        return (eje = tempEje);
      });
    }

    return eje;
  });

  return { ...vehicle, tires: ejes };
};

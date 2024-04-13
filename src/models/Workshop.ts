export interface WorkshopReport {
  alineacion: boolean;
  aplicacion: number;
  aplicacion_nombre: string;
  cambio_hubometro: boolean;
  configuracion: Configuracion;
  duracion: number;
  fecha_final: string;
  fecha_inicio: string;
  folio: string;
  gepp: string;
  hoja: null;                                   //CHECK
  id: number;
  inch_ejes: InchEjes;
  km_cambio_hubometro: null;                    //CHECK
  km_impossible_register: boolean;
  km_vehiculo: number;
  marca: string;
  modelo: string;
  numero_economico: string;
  service_tires: ServiceTire[];
  ubicacion: number;
  ubicacion_nombre: string;
  usuario: number;
  usuario__username: string;
  vehiculo: number;
  version: number;
}

export interface Configuracion {
  id: number;
  clase: string;
  llantas: Llanta[];
  configuracion: string;
  numero_llantas: number;
}

export interface Llanta {
  color_buttom: string;
  color_middle: string;
  color_top: string;
  eje: number;
  en_seguimiento: boolean;
  id: number;
  nombre_de_eje: string;
  numero_economico: string;
  posicion: string;
  presion_actual: number;
  producto: string;
  profundidad_central: number | null;
  profundidad_derecha: number | null;
  profundidad_izquierda: number | null;
  tipo_de_eje: string;
}

export interface InchEjes {
  ejes: [];                                    //CHECK
  vehiculo: number;
}

export interface ServiceTire {
    balanceado: boolean;
    comentario: string;
    costado_reparado: boolean;
    desmontaje: boolean;
    desmontar_eje: number | null;
    desmontar_inventario_llanta: number | null;
    desmontar_km_montaje: number | null;
    desmontar_llanta: number | null;
    desmontar_llanta_economico: string | null;
    desmontar_min_profundidad: number | null;
    desmontar_nombre_de_eje: string | null;
    desmontar_numero_economico: string | null;
    desmontar_producto: number | null;
    desmontar_renovador: number | null;
    desmontar_taller: number | null;
    desmontar_tipo_de_eje: string | null;
    eje: number;
    en_punto_de_retiro_param: number;
    girar_llanta: boolean;
    id: number;
    inflado: boolean;
    inventario_desmontaje: number | null;
    km: number | null;
    km_vehiculo: number;
    llanta_original: number;
    llanta_servicio_carretero: number | null;
    llanta_servicio_carretero_economico: string | null;
    marcaje_llanta: boolean;
    min_profundidad: number;
    nombre_de_eje: string;
    numero_economico: string;
    posicion: string;
    producto: number;
    razon_desmontaje: string | null;
    renovador: number | null;
    reparado: boolean;
    rotar: boolean;
    rotar_eje: number | null;
    rotar_km_montaje: number | null;
    rotar_llanta: number | null;
    rotar_llanta_economico: string | null;
    rotar_min_profundidad: number | null;
    rotar_mismo: boolean;
    rotar_nombre_de_eje: string | null;
    rotar_numero_economico: string | null;
    rotar_otro: boolean;
    rotar_posicion: string | null;
    rotar_producto: number | null;
    rotar_producto_nombre: string | null;
    rotar_renovador: number | null;
    rotar_renovador_nombre: string | null;
    rotar_tipo_de_eje: string | null;
    rotar_vehiculo: number | null;
    rotar_vehiculo_economico: string | null;
    servicio: number;
    servicio_carretero: boolean;
    taller_desmontaje: number | null;
    tipo_de_eje: string;
    valvula_reparada: boolean;
  }
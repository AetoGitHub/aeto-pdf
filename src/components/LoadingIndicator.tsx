import loadingGif from "../assets/loadingGif.gif"

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-1">
        <img src={loadingGif} alt="loading-gif" className="w-[50px] h-[50px]"/>
        <span>Cargando...</span> 
    </div>
  )
}

export default LoadingIndicator
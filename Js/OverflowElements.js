/**ocultamos la seccion donde mostraremos los datos del clima del dia actual**/
export const ocultar_section_search = () => {
    if (panel_search.classList.contains("invisible")) {
      panel_search.classList.replace("invisible", "visible");
    }
  };
  
  /***ocultamos la seccion de la busqueda*/
export const Mostrar_SeccionPrincipal = () => {
    if (panel_search.classList.contains("visible")) {
      panel_search.classList.replace("visible", "invisible");
    }
  };
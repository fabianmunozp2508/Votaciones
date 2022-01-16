
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Inicio',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'Gráficas', url: 'grafica1' },
            
          ]
        },
        {
          titulo: 'Votaciones',
          icono: 'mdi mdi-contact-mail',
          submenu: [
            { titulo: 'Consulta Votacion', url: 'ConsultarVotantes' },
            { titulo: 'Inscribir Votantes', url: 'InscribirVotantes' },
            { titulo: 'Listado de votantes', url: 'ConfirmarVotacion' },
           
          ]
        },
        {
          titulo: 'Reportes',
          icono: 'mdi mdi-chart-bar',
          submenu: [
           { titulo: 'Reportes de Egresos', url: 'ReportesIngresos' },
           { titulo: 'Reportes de Ingresos', url: 'ReportesEgresos' },  
                 
            
          ]
        },
        {
          titulo: 'Contabilidad',
          icono: 'mdi mdi-cash-usd',
          submenu: [
            { titulo: 'Ingresos', url: 'IngresosCampana' },
            { titulo: 'Egresos', url: 'IngresarGastos' },  
                     
            
          ]
        },
        {
          titulo: 'Irregularidades',
          icono: 'mdi mdi-voice',
          submenu: [
            { titulo: 'Repostar anomalia ', url: 'Reportaranomalia' },
            { titulo: 'Reportar Fraude', url: 'Reportarfraude' },  
               
            
          ]
        },
    
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [           
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Médicos', url: 'medicos' },
          ]
        },
      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[5].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}

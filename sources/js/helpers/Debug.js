
import config from '../config.json';

const Debug = ( foo, mode = 'auto' ) => {

    if( ! config.debug ){ return ; }

    if( mode === 'log' ){
        console.log( foo );
        return ;
    }

    if( mode === 'table' ){
        console.table( foo );
        return ;
    }

    // verify if foo is a string
    if( typeof foo === 'string' ){
        console.log( foo );
        return ;
    }

    console.table( foo );
}

export default Debug ;
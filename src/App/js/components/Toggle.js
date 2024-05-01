
import { __ } from '@wordpress/i18n';

import { ManagerIsActive } from "../others/SignalsPrimitives.js";
import { effect } from "@preact/signals-react";
import localStorage from "../others/LocalStorage.js";

const Toggle = ( props ) => {

    const storage = new localStorage();

    effect( () => {
        storage.setManagerIsActive( ManagerIsActive.value );
    });

    return (
        <>
            <button className='blocks-ligatures-toggle' onClick={()=>{
                ManagerIsActive.value = ! ManagerIsActive.value ;
            }}>
                { __( 'Toggle Ligature\'s Manager', 'blocks-ligatures') }
            </button>
        </>
    );

}

export { Toggle }
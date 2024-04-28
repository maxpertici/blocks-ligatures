
import { __ } from '@wordpress/i18n';
import "../../sass/components/Toggle.scss"
import { ManagerIsActive } from "./Signals.js";
import { effect } from "@preact/signals-react";

const Toggle = ( props ) => {
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
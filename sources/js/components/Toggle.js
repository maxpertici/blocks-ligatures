
import { __ } from '@wordpress/i18n';
import {useEffect, useState, useMemo} from 'react';
import localStorage from "../helpers/LocalStorage.js";

import { useBLStore } from "../helpers/Store.js";

const Toggle = ( props ) => {

    const storage = new localStorage();
    const ManagerIsActive = useBLStore((state) => state.ManagerIsActive)

    useEffect(() => {
        storage.setManagerIsActive( ManagerIsActive );
      }, [ ManagerIsActive ]);

    const setManagerIsActive = useBLStore((state) => state.setManagerIsActive)
    return (
        <>
            <button className='blocks-ligatures-toggle' onClick={()=>{
                setManagerIsActive(!ManagerIsActive);
            }}>
                { __( "Toggle Ligature's Manager", 'blocks-ligatures') }
            </button>
        </>
    );

}

export { Toggle }
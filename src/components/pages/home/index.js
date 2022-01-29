import { useState } from 'react';

import { ModalIdx } from '../../widgets/Modal';
import { BtnIdx } from '../../core/Button';

const Home = () => {
    // toggle
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }

    return (
        <>
            <BtnIdx type='modal' text='Modal' btnOnclick={ handleShow }/>
            <ModalIdx type='regular' isShown={ show } btnOnhide={ handleClose }/>
        </>
    )
};

export default Home;
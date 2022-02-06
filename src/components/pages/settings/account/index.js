import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosDef from "../../../../util/Request";

import Container from "../../../core/Container";
import Row from "../../../core/Row";
import Column from "../../../core/Column";

export const AccountSettings = ({ isDefault }) => {
    // const location = useLocation();

    // console.log('path: ', currentPathname)

    const getUserSettings = async() => {
        console.log('user seetings')

        await axiosDef('http://localhost:8000/api/')
    }

    return (
       <Container fluid={ true } containerClass='bg-warning'>
           Settings/Account
           <Row rowClass='bg-success mt-3'>
               <Column columnClass='bg-secondary'>
                    Email
               </Column>
               <Column>
                    Update
               </Column>
           </Row>
           <Row rowClass='bg-success mt-3'>
               <Column>
                    Password
               </Column>
               <Column columnClass='bg-secondary'>
                    Update
               </Column>
           </Row>
           <Row rowClass='bg-success mt-3'>
               <Column columnClass='bg-secondary'>
                    Delete account
               </Column>
               <Column>
                    Request
               </Column>
           </Row>
       </Container>
    )
};

export default AccountSettings;
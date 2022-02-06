import { useState, useEffect, useRef } from "react";
import axiosDef from "../../../../util/Request";
import Cookies from "js-cookie";

import Container from "../../../core/Container";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";
import Form from "../../../widgets/Form";
import Input from "../../../core/Input";
import Label from "../../../core/Label";
import Button from "../../../core/Button";
import Image from "../../../core/Image";

export const ProfileSettings = () => {

    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const [displayPhotoPath, setDisplayPhotoPath] = useState(null);
    const displayPhotoRef = useRef();

    console.log('path: ', JSON.parse(Cookies.get('x_auth_user_display_photo')));

    const triggerFileSelect = evt => {
        evt.current.click();
    }

    const addDisplayPhoto = evt => {
        evt.preventDefault();

        const addPhotoForm = new FormData(evt.target)
        addPhotoForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/display-photo/store', addPhotoForm)

        .then (res => {
            const addPhotoRes = res.data;

            if (addPhotoRes.isSuccess) {
                Cookies.set('x_auth_user_display_photo', JSON.stringify(addPhotoRes.data['image_path']), { sameSite: 'strict', secure: true });

                // clear input field
                displayPhotoRef.current.value = '';
            } else {
                console.log('res upload err ', addPhotoRes.data);
            }
        })

        .catch (err => {
            console.log('err photo res', err.response.data.errors)
        })
    }

    useEffect(() => {
        if (displayPhotoPath === null) {
            Cookies.get('x_auth_user_display_photo') && setDisplayPhotoPath(JSON.parse(Cookies.get('x_auth_user_display_photo')));
        }
    }, [])

    return (
        <Container fluid={ true } containerClass='bg-warning'>
            Settings/Account
            <Row rowClass='bg-success mt-3'>
                <Column columnClass='bg-secondary p-3'>
                    <Span type='regular' text='Display photo:'/>
                    <Image 
                    src={ new URL(displayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                    imgClass='bg-purple-100'
                    imgStyle={{ objectFit: 'cover', width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px', }}/>
                </Column>
                <Column>
                    <Form
                    action='#'
                    method='POST'
                    encType='multipart'
                    onSubmit={ addDisplayPhoto }>
                        <Label
                        text='Select' 
                        labelOnclick={ triggerFileSelect } 
                        refTarget={ displayPhotoRef }/>
                        <Input 
                        fieldType='file'
                        type='file' 
                        refTarget={ displayPhotoRef } 
                        name='display_photo' 
                        accept='image/*'
                        hidden={ true }/>
                        <Button type='submit' text='Save'/>
                    </Form>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem perspiciatis mollitia fugiat vero. Repellendus minus nisi dicta facilis eos dolor ullam odio esse hic molestiae. Maxime error quae tempora, ipsum inventore corporis iusto voluptatibus, tenetur cumque fuga quia excepturi harum quaerat. Inventore, consectetur beatae. Similique voluptate, sapiente iure doloribus pariatur ullam. Sint maiores pariatur itaque. Possimus accusantium cumque, veniam blanditiis nam minima reprehenderit quam sequi a fuga incidunt! Dolores perferendis harum dicta quaerat blanditiis accusantium quo quibusdam, facere autem accusamus fuga voluptatum necessitatibus soluta vitae ullam, odio cumque atque ea velit? Itaque, voluptatem praesentium! Beatae nemo placeat autem corporis fuga. Qui, id nostrum provident labore aliquam dolorem reprehenderit saepe maiores necessitatibus ea, est, quae dignissimos odio fugiat. A veniam illo nobis minima fugit deserunt perferendis laudantium, cum quasi voluptatem, fugiat dignissimos molestias, commodi rerum. Quia, perspiciatis dolorem magnam illo consequuntur voluptate architecto! Doloribus saepe impedit minima sint atque id sunt iusto eaque vero ut? Repellendus harum cumque, expedita dolore rerum doloribus sequi! Asperiores possimus quis commodi voluptates sit officia odio repellendus dolore modi nulla! Ad deserunt corrupti rerum error est quaerat optio cupiditate, blanditiis eos quam nostrum culpa totam quos placeat molestiae in perspiciatis animi? Voluptates similique accusamus in quasi quia. Vitae, quo quibusdam nobis vel excepturi, dicta dolorum recusandae expedita quod suscipit harum rerum, in nemo sed facere nam facilis rem? Labore voluptate possimus iste alias cum ducimus optio. Ullam optio aspernatur nisi esse animi accusantium ut rem ratione. Quos cum, tenetur illum culpa libero repellendus voluptas mollitia tempore commodi, recusandae sapiente voluptatem modi itaque similique, sit vel dolore doloribus in blanditiis minima harum dolores quis dicta praesentium! Totam esse sunt atque nobis ratione nostrum? Sequi maxime distinctio iure molestiae possimus ipsum facere. Reiciendis, temporibus repellendus maiores praesentium pariatur neque maxime aspernatur accusantium eligendi at sequi exercitationem esse facere laborum tenetur. Eveniet ea aperiam alias, unde deserunt odio minus omnis odit amet natus est voluptate doloremque, culpa quis expedita dolorem, ad magnam cumque aspernatur ipsum earum. Sapiente incidunt magni eius quidem corrupti laborum et sint ex cumque explicabo. Fugit sit dolores nisi deleniti reiciendis, nulla eum dolor id fuga quidem repellendus esse aliquam enim, mollitia nam. Praesentium pariatur ratione quam delectus dicta deleniti inventore fugiat repellendus expedita deserunt voluptatum, accusamus et id voluptas saepe minima eum nihil animi in. Vero, perspiciatis perferendis tempora pariatur fuga itaque, odit, laboriosam corrupti hic rerum facere nihil. Iste nam, asperiores enim quam incidunt quos, modi sint libero laboriosam, eveniet veritatis. Magnam molestiae quod aliquid error ipsam voluptatum dolorem quia quasi debitis! Cupiditate nam cumque hic fugiat tempora nemo, placeat qui reprehenderit suscipit atque sequi incidunt quis enim perspiciatis esse minus. Nostrum eligendi quos omnis tempora in similique repellat, accusantium rerum voluptatibus, adipisci praesentium ut animi odit id nobis, veritatis at dicta mollitia cumque voluptatum saepe laboriosam? Recusandae exercitationem provident ipsam, quos labore facere cum iure, perferendis ad quas, ex totam sapiente doloribus nihil. Harum, magni porro, mollitia eum eos corrupti voluptatibus est ratione ipsam ea cumque vel itaque nesciunt molestias exercitationem, laudantium explicabo?
               </Column>
            </Row>
        </Container>
    )
};

export default ProfileSettings;
import Feed from '../../components/feed/Feed'

const objectmocked = {
    "id": 21,
    "name": "ONG TESTE 01 - NÃO APAGAR",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
    "is_formalized": true,
    "start_year": 2018,
    "contact_phone": "8199999999",
    "instagram_link": "www.instagram.com.br",
    "x_link": "www.x.com",
    "facebook_link": "www.facebook.com.br",
    "pix_qr_code_link": "wwlkadaodkaodaodaoda",
    "gallery_images_url": [],
    "skills": [
        {
            "id": 1,
            "name": "Artes"
        }
    ],
    "causes": [
        {
            "id": 2,
            "name": "Advocacy- Políticas Públicas",
            "description": ""
        }
    ],
    "sustainable_development_goals": [
        {
            "id": 9,
            "name": "Indústria, inovação e infraestrutura",
            "url_ods": "https://brasil.un.org/pt-br/sdgs/9",
            "logo_url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTE1LCJwdXIiOiJibG9iX2lkIn19--43ac2219208e93e544e0edd46c2dc58e78e9e098/ods-09.png"
        }
    ]
}


export default function NgoViewEdit() {
    return (
        <>
            <Feed 
            capa="https://picsum.photos/200/300?random=1" 
            ngo_logo="https://picsum.photos/200/300?random=1" 
            name_ngo={objectmocked.name}
            bio_description={objectmocked.description}
            perfil={true}
            facebook_link={objectmocked.facebook_link}
            instagram_link={objectmocked.instagram_link}
            pix_qr_code_link={objectmocked.pix_qr_code_link}
            x_link={objectmocked.x_link}
            />
        </>
    )
}

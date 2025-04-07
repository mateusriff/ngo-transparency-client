const mockRes = {
  message: "Login bem-sucedido",
  user: {
    name: "api teste2",
    email: "apiteste2@rdmapps.com.br"
  },
  ngo: {
    username: "ONG TESTE 01 - NÃO APAGAR",
    email: "randomngo@email.com",
    name: "ONG TESTE 01 - NÃO APAGAR",
    description: "",
    is_formalized: true,
    start_year: 2018,
    contact_phone: "8199999999",
    instagram_link: "www.instagram.com.br",
    x_link: "www.x.com",
    facebook_link: "www.facebook.com.br",
    pix_qr_code_link: "wwlkadaodkaodaodaoda",
    site: null,
    id: 21,
    created_at: "2025-04-06T20:42:54.543Z",
    ong: 21,
    gallery_images: [
      "https://bora-impactar-prd.setd.rdmapps.com.br/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTAyLCJwdXIiOiJibG9iX2lkIn19--37fe9618b09fec89d7147328312bd0625bc2fae5/290-190x112.jpg",
      "https://bora-impactar-prd.setd.rdmapps.com.br/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTAzLCJwdXIiOiJibG9iX2lkIn19--2cbc68ee78e2325c206dda14aeb181a7fb584451/661-255x204.jpg",
      "https://bora-impactar-prd.setd.rdmapps.com.br/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTA0LCJwdXIiOiJibG9iX2lkIn19--083e0dbb3f9bf68811506a5bb44a5270740a9003/446-190x112.jpg"
    ],
    skills: [
      {
        id: 1,
        name: "Artes"
      }
    ],
    causes: [
      {
        id: 2,
        name: "Advocacy- Políticas Públicas",
        description: ""
      }
    ],
    sustainable_development_goals: [
      {
        id: 9,
        name: "Indústria, inovação e infraestrutura",
        url_ods: "https://brasil.un.org/pt-br/sdgs/9",
        logo_url: "https://bora-impactar-prd.setd.rdmapps.com.br/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTE1LCJwdXIiOiJibG9iX2lkIn19--43ac2219208e93e544e0edd46c2dc58e78e9e098/ods-09.png"
      }
    ]
  }
};

const login = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    ok: true,
    status: 200,
    json: async () => mockRes
  };
};

export default login;
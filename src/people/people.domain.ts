export type PeopleResponse ={
    "id": number;
    "nombre": string;
    "año_de_nacimiento": string;
    "color_de_ojos": string;
    "genero": 'male'|'female'|'unknow'|'n/a';
    "color_de_cabello": string;
    "altura": string;
    "masa_en_kg": string;
    "color_de_piel": string;
    "creado": Date;
    "actualizado": Date;
}

export type CreatePeopleRequest = Omit<PeopleResponse, 'id' | 'creado' | 'actualizado'>;

export type People = {
    readonly id: number;
    readonly name: string;
    readonly birth_year: string;
    readonly eye_color: string;
    readonly gender: 'male'|'female'|'unknow'|'n/a';
    readonly hair_color: string;
    readonly height: string;
    readonly mass: string;
    readonly skin_color: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}

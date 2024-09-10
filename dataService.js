export class DataService {
    async getData() {
        return {
            name: 'João da Silva',
            date: '13/01/2002',
            course: 'Engenharia de Software',
            studentRegistration: '202012345',
            shift: 'Noturno',
            documentId: '12345678910',
            documentCpf: '123.456.789-10',
            maritalStatus: 'Solteiro'
        };
    }
}
export class enquiryForm {
    "createEnquiryDTO": {
        firstName?: string;
        lastName?: string;
        mobileNo?: string;
        mail?: string;
        address?: string;
        interestedIn?: string;
        date?: string;
    }
    "createEnquiryDetailsDTO": {
        enquiryId: number;
        planningDate: string;
        description: string;
    }
}
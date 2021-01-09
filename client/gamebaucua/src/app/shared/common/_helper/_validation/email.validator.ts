import { FormControl } from '@angular/forms';

export function emailDomainValidator(control: FormControl): { [key: string]: object } | null {
    const email = control.value as string;
    if (email && (email.indexOf('@') !== -1)) {
        const [_, domain] = email.split('@');
        if (domain !== 'gmail.com') {
            return {
                emailDomain: {
                    parsedDomain: domain
                }
            };
        }
    }
    return null;
}

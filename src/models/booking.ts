export enum BookingStatus {
	Pending = 'Pending',
	Approved = 'Approved',
	Cancelled = 'Cancelled'
}

export default class Booking {
	title: string;
	time: string;
	date: string | any;
	attendees: number;
	description: string;
	creator: string;
	status: BookingStatus;

	constructor(title: string, time: string, date: Date, attendees: number, description: string, creator: string) {
		this.title = title;
		this.time = time;
		this.date = date;
		this.attendees = attendees;
		this.description = description;
		this.creator = creator;
		this.status = BookingStatus.Pending;
	}

	isPending(): boolean {
		return this.status == BookingStatus.Pending;
	}

	isCancelled(): boolean {
		return this.status == BookingStatus.Cancelled;
	}

	isApproved(): boolean {
		return this.status == BookingStatus.Approved;
	}

	pending(): void {
		this.status = BookingStatus.Pending;
	}

	approve(): void {
		this.status = BookingStatus.Approved;
	}

	cancel(): void {
		this.status = BookingStatus.Cancelled;
	}
}

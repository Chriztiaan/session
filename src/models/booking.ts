export enum BookingStatus {
	Pending,
	Approved,
	Cancelled
}

export default class Booking {
	title: string;
	time: string;
	date: string;
	attendees: number;
	information: string;
	creator: string;
	status: BookingStatus;

	constructor(title: string, time: string, date: string, attendees: number, information: string, creator: string) {
		this.title = title;
		this.time = time;
		this.date = date;
		this.attendees = attendees;
		this.information = information;
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

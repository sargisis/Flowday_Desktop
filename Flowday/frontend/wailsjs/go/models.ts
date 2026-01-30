export namespace services {
	
	export class Task {
	    id: string;
	    title: string;
	    completed: boolean;
	    createdAt: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.completed = source["completed"];
	        this.createdAt = source["createdAt"];
	    }
	}
	export class UserProfile {
	    name: string;
	    level: number;
	    xp: number;
	    streak: number;
	
	    static createFrom(source: any = {}) {
	        return new UserProfile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.level = source["level"];
	        this.xp = source["xp"];
	        this.streak = source["streak"];
	    }
	}

}


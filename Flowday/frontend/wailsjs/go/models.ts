export namespace services {
	
	export class CEvent {
	    id: string;
	    title: string;
	    start: string;
	    end: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new CEvent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.start = source["start"];
	        this.end = source["end"];
	        this.type = source["type"];
	    }
	}
	export class Project {
	    id: string;
	    name: string;
	    color: string;
	
	    static createFrom(source: any = {}) {
	        return new Project(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.color = source["color"];
	    }
	}
	export class Task {
	    id: string;
	    title: string;
	    completed: boolean;
	    createdAt: string;
	    projectId: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.completed = source["completed"];
	        this.createdAt = source["createdAt"];
	        this.projectId = source["projectId"];
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


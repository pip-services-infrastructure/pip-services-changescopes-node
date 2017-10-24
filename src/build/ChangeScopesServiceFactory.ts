import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ChangeScopesMongoDbPersistence } from '../persistence/ChangeScopesMongoDbPersistence';
import { ChangeScopesFilePersistence } from '../persistence/ChangeScopesFilePersistence';
import { ChangeScopesMemoryPersistence } from '../persistence/ChangeScopesMemoryPersistence';
import { ChangeScopesController } from '../logic/ChangeScopesController';
import { ChangeScopesHttpServiceV1 } from '../services/version1/ChangeScopesHttpServiceV1';
import { ChangeScopesSenecaServiceV1 } from '../services/version1/ChangeScopesSenecaServiceV1'; 

export class ChangeScopesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-ChangeScopes", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-changescopes", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-changescopes", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-changescopes", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-changescopes", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-changescopes", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-changescopes", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ChangeScopesServiceFactory.MemoryPersistenceDescriptor, ChangeScopesMemoryPersistence);
		this.registerAsType(ChangeScopesServiceFactory.FilePersistenceDescriptor, ChangeScopesFilePersistence);
		this.registerAsType(ChangeScopesServiceFactory.MongoDbPersistenceDescriptor, ChangeScopesMongoDbPersistence);
		this.registerAsType(ChangeScopesServiceFactory.ControllerDescriptor, ChangeScopesController);
		this.registerAsType(ChangeScopesServiceFactory.SenecaServiceDescriptor, ChangeScopesSenecaServiceV1);
		this.registerAsType(ChangeScopesServiceFactory.HttpServiceDescriptor, ChangeScopesHttpServiceV1);
	}
	
}

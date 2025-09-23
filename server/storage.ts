import { 
  users, 
  contactInquiries, 
  proposals, 
  type User, 
  type InsertUser, 
  type ContactInquiry, 
  type InsertContactInquiry,
  type Proposal,
  type InsertProposal
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact inquiry methods
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiry(id: string): Promise<ContactInquiry | undefined>;
  
  // Proposal methods
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  getProposal(id: string): Promise<Proposal | undefined>;
  updateProposal(id: string, updates: Partial<Proposal>): Promise<Proposal | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [contactInquiry] = await db
      .insert(contactInquiries)
      .values(inquiry)
      .returning();
    return contactInquiry;
  }

  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry || undefined;
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const [createdProposal] = await db
      .insert(proposals)
      .values(proposal)
      .returning();
    return createdProposal;
  }

  async getProposal(id: string): Promise<Proposal | undefined> {
    const [proposal] = await db.select().from(proposals).where(eq(proposals.id, id));
    return proposal || undefined;
  }

  async updateProposal(id: string, updates: Partial<Proposal>): Promise<Proposal | undefined> {
    const [updatedProposal] = await db
      .update(proposals)
      .set(updates)
      .where(eq(proposals.id, id))
      .returning();
    return updatedProposal || undefined;
  }
}

// Use MemStorage by default as per guidelines
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactInquiries: Map<string, ContactInquiry>;
  private proposals: Map<string, Proposal>;

  constructor() {
    this.users = new Map();
    this.contactInquiries = new Map();
    this.proposals = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const contactInquiry: ContactInquiry = {
      id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || null,
      restaurant: inquiry.restaurant || null,
      message: inquiry.message || null,
      createdAt: new Date()
    };
    this.contactInquiries.set(id, contactInquiry);
    return contactInquiry;
  }

  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    return this.contactInquiries.get(id);
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const id = randomUUID();
    const createdProposal: Proposal = {
      id,
      contactInquiryId: proposal.contactInquiryId,
      selectedFeatures: Array.isArray(proposal.selectedFeatures) ? proposal.selectedFeatures : [],
      totalPrice: proposal.totalPrice,
      basePrice: proposal.basePrice || 40000,
      createdAt: new Date(),
      pdfGenerated: false
    };
    this.proposals.set(id, createdProposal);
    return createdProposal;
  }

  async getProposal(id: string): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async updateProposal(id: string, updates: Partial<Proposal>): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;
    
    const updated = { ...proposal, ...updates };
    this.proposals.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();

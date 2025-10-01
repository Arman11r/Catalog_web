import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertProposalSchema } from "../shared/schema";
import { ZodError } from "zod";
import { z } from "zod";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const featurePrices: Record<string, number> = {
  "live-status": 3000,
  "reviews": 2500,
  "feedback": 1500,
  "loyalty": 4000,
  "notifications": 3500,
  "chatbot": 5000,
  "appointments": 3000,
  "analytics": 4500,
  "multilang": 2000,
  "profiles": 3500,
  "social": 2000,
  "seo": 3500,
  "invoicing": 3000,
  "profit": 4000,
  "upselling": 2500,
  "ar": 20000
};

const featureNames: Record<string, string> = {
  "live-status": "Live Order Status Update",
  "reviews": "Customer Reviews & Ratings", 
  "feedback": "Suggestion/Feedback Form",
  "loyalty": "Loyalty Points / Discount Coupons",
  "notifications": "WhatsApp/SMS Notifications",
  "chatbot": "Chatbot Helper",
  "appointments": "Schedule Your Table Appointment",
  "analytics": "Advanced Sales Report & Analytics",
  "multilang": "Multi-Language Menu Support",
  "profiles": "Customer Profile & Order History",
  "social": "Social Media Integration",
  "seo": "SEO Optimized Website",
  "invoicing": "GST/Tax Invoice Generator",
  "profit": "Expense & Profit Calculator",
  "upselling": "Add-on Items & Upselling",
  "ar": "AR Dish Preview"
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      res.json({ 
        success: true, 
        message: "Thank you for your inquiry! We will get back to you soon.", 
        inquiryId: inquiry.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again." 
        });
      }
    }
  });

  // Generate proposal
  app.post("/api/proposal", async (req, res) => {
    try {
      // Validate the request with proper schema
      const validationSchema = insertProposalSchema.extend({
        selectedFeatures: z.array(z.string())
      });
      
      const validatedData = validationSchema.parse({
        selectedFeatures: req.body.selectedFeatures,
        totalPrice: 0, // Will be calculated
        basePrice: 40000,
        contactInquiryId: null
      });

      // Calculate total price
      const basePrice = 40000;
      const addOnTotal = validatedData.selectedFeatures.reduce((sum, featureId) => {
        return sum + (featurePrices[featureId] || 0);
      }, 0);
      const totalPrice = basePrice + addOnTotal;

      const proposalData = {
        selectedFeatures: validatedData.selectedFeatures,
        totalPrice,
        basePrice,
        contactInquiryId: null
      };

      const proposal = await storage.createProposal(proposalData);
      
      res.json({
        success: true,
        proposalId: proposal.id,
        totalPrice,
        selectedFeatures: validatedData.selectedFeatures
      });
    } catch (error) {
      console.error("Proposal creation error:", error);
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create proposal"
        });
      }
    }
  });

  // Generate PDF
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const { proposalId, selectedFeatures } = req.body;
      
      if (!proposalId) {
        return res.status(400).json({
          success: false,
          message: "Proposal ID is required"
        });
      }

      const proposal = await storage.getProposal(proposalId);
      if (!proposal) {
        return res.status(404).json({
          success: false,
          message: "Proposal not found"
        });
      }

      // Generate PDF HTML content
      const today = new Date().toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });

      const baseFeatures = [
        "Custom Website (Responsive Design)",
        "Digital Menu with Images & Categories", 
        "Table-wise QR Code Scanning",
        "Cart & Order Placement",
        "Admin Dashboard for Orders",
        "Secure Payment Gateway Integration"
      ];

      const selectedFeatureList = selectedFeatures.map((id: string) => featureNames[id]).filter(Boolean);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #222; margin: 0; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff7043, #ff915f); padding: 28px 30px 24px; color: #fff; border-radius: 18px; text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 2.2em; letter-spacing: 1px; }
            .header .tagline { margin: 6px 0 0; font-size: 0.95em; opacity: 0.9; }
            .header .date { margin-top: 8px; font-size: 0.8em; font-weight: 600; background: rgba(255,255,255,0.18); display: inline-block; padding: 4px 10px; border-radius: 20px; }
            .section { margin-top: 28px; padding: 22px 24px; border: 1px solid #ffe0d3; border-radius: 16px; background: linear-gradient(180deg, #fff, #fff8f5); }
            .section-title { margin: 0 0 14px; font-size: 1.25em; display: flex; align-items: center; gap: 8px; color: #ff5a22; }
            .feature-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 26px; }
            .feature-list li { background: #ffffff; border: 1px solid #ffe0d3; padding: 10px 12px 9px 14px; border-radius: 10px; font-size: 0.9em; display: flex; align-items: flex-start; gap: 8px; }
            .feature-list li:before { content: '✔'; color: #ff7043; font-weight: 700; }
            .summary-box { margin-top: 30px; background: linear-gradient(135deg, #fff0ea, #ffe9e1); border: 2px dashed #ff8a57; padding: 22px 26px 24px; border-radius: 18px; text-align: center; }
            .summary-box h2 { margin: 0 0 10px; font-size: 1.6em; color: #ff4e14; }
            .summary-box .amount { font-size: 2.1em; font-weight: 700; letter-spacing: 1px; color: #d83d00; }
            .contacts { margin-top: 34px; padding: 20px 22px 18px; border-radius: 16px; background: #1f1f1f; color: #fafafa; }
            .contacts h3 { margin: 0 0 14px; font-size: 1.05em; letter-spacing: 1px; text-transform: uppercase; color: #ffb199; }
            .contact-item { display: flex; align-items: center; gap: 10px; font-size: 0.9em; background: #2b2b2b; padding: 10px 12px; border-radius: 10px; margin-bottom: 8px; }
            .contact-icon { background: #ff7043; color: #fff; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 0.85em; font-weight: 600; }
            .footer-note { margin-top: 28px; font-size: 0.65em; text-align: center; opacity: 0.65; letter-spacing: 0.5px; }
            @media (max-width: 600px) { .feature-list { grid-template-columns: 1fr; } .header h1 { font-size: 1.8em; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CafeCanvas</h1>
            <div class="tagline">Customized Digital Restaurant Experience</div>
            <div class="date">Proposal Date: ${today}</div>
          </div>
          
          <div class="section">
            <h3 class="section-title"><span>✅</span> Base Package (₹${(40000).toLocaleString('en-IN')})</h3>
            <ul class="feature-list">
              ${baseFeatures.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          ${selectedFeatureList.length > 0 ? `
          <div class="section">
            <h3 class="section-title"><span>➕</span> Selected Add-On Features</h3>
            <ul class="feature-list">
              ${selectedFeatureList.map((feature: string) => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div class="summary-box">
            <h2>Total Investment</h2>
            <div class="amount">₹${proposal.totalPrice.toLocaleString('en-IN')}</div>
          </div>
          
          <div class="contacts">
            <h3>Contact Details</h3>
            <div class="contact-item">
              <span class="contact-icon">R</span>
              <strong>Rachit Agrawal</strong> | +91 87918 04428
            </div>
            <div class="contact-item">
              <span class="contact-icon">A</span>
              <strong>Arman Ahmed</strong> | +91 95487 84462
            </div>
          </div>
          
          <div class="footer-note">
            Generated PDF – CafeCanvas Feature Selection • This is an auto-generated summary of selected features.
          </div>
        </body>
        </html>
      `;

      // Generate PDF using puppeteer-core & @sparticuz/chromium (Vercel-compatible)
      const isVercel = !!process.env.VERCEL;
      let executablePath = await chromium.executablePath();
      if (!executablePath) {
        executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : process.platform === 'win32'
            ? 'C://Program Files//Google//Chrome//Application//chrome.exe'
            : '/usr/bin/google-chrome');
      }

      const browser = await puppeteer.launch({
        args: isVercel ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: isVercel ? chromium.defaultViewport : null,
        executablePath,
        headless: true,
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
          right: '0.5in'
        }
      });
      
      await browser.close();

      // Update proposal to mark PDF as generated
      await storage.updateProposal(proposalId, { pdfGenerated: true });

      // Send PDF as response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="CafeCanvas_Feature_Selection.pdf"');
      res.send(pdfBuffer);

    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate PDF"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

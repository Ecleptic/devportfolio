#!/bin/bash
# Test Sanity Webhook Endpoint

echo "🧪 Testing Sanity Webhook Endpoint..."
echo ""

# Test health check (GET)
echo "1️⃣  Testing health check (GET /api/sanity-webhook):"
RESPONSE=$(curl -s http://localhost:3000/api/sanity-webhook)
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
echo ""

# Check if webhook is properly configured
if echo "$RESPONSE" | grep -q '"status":"ok"'; then
    echo "✅ Webhook endpoint is running!"
    echo ""
    
    # Check configuration
    if echo "$RESPONSE" | grep -q '"webhookSecret":true'; then
        echo "✅ SANITY_WEBHOOK_SECRET is configured"
    else
        echo "❌ SANITY_WEBHOOK_SECRET is missing"
    fi
    
    if echo "$RESPONSE" | grep -q '"githubToken":true'; then
        echo "✅ GITHUB_TOKEN is configured"
    else
        echo "❌ GITHUB_TOKEN is missing"
    fi
    
    echo ""
    echo "🎉 Webhook is ready for production!"
else
    echo "❌ Webhook endpoint is not responding correctly"
    echo "Response: $RESPONSE"
fi

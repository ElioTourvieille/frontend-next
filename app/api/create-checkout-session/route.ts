import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    console.log('1. Starting checkout session creation');

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log('2. User:', user?.email);

    if (!user || !user.email) {
      console.log('3. Unauthorized - No user or email');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { priceId } = body;
    console.log('4. Price ID received:', priceId);

    if (!priceId) {
      console.log('5. No price ID provided');
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    console.log('6. Creating Stripe session with:', {
      email: user.email,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/user/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/user/subscription?canceled=true`,
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/subscription?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/subscription?canceled=true`,
    });

    console.log('7. Session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error in checkout session:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { 
      status: 500 
    });
  }
} 
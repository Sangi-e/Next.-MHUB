
import { Booking } from '../types';

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: '1',
        serviceId: 's1',
        providerId: 'p1',
        providerName: 'Sarah Johnson',
        providerAvatar: 'https://picsum.photos/100/100?random=2',
        serviceTitle: 'Logo Design Package',
        date: '2025-11-27',
        time: '14:00',
        status: 'confirmed', // Accepted/In Progress
        amount: 350,
        paymentStatus: 'escrow',
        location: 'Remote',
        timeline: [
            { title: 'Request Sent', date: 'Nov 25, 09:00', status: 'completed' },
            { title: 'Provider Accepted', date: 'Nov 25, 10:30', status: 'completed' },
            { title: 'Funds Secured', date: 'Nov 25, 10:35', status: 'completed' },
            { title: 'Work In Progress', status: 'current' },
            { title: 'Service Completed', status: 'pending' },
        ]
    },
    {
        id: '2',
        serviceId: 's3',
        providerId: 'p3',
        providerName: 'Michael Chen',
        providerAvatar: 'https://picsum.photos/100/100?random=3',
        serviceTitle: 'Car Engine Inspection',
        date: '2024-03-22',
        time: '14:00',
        status: 'completed',
        amount: 60,
        paymentStatus: 'paid',
        location: 'Yaba, Lagos',
        hasReview: true,
        timeline: [
            { title: 'Request Sent', date: 'Mar 20, 08:00', status: 'completed' },
            { title: 'Work Completed', date: 'Mar 22, 15:00', status: 'completed' },
            { title: 'Payment Released', date: 'Mar 22, 15:05', status: 'completed' },
        ]
    },
    {
        id: '3',
        serviceId: 's5',
        providerId: 'p4',
        providerName: 'Emmanuel Doe',
        providerAvatar: 'https://picsum.photos/100/100?random=5',
        serviceTitle: 'Pipe Maintenance',
        date: '2025-11-28',
        time: '11:00',
        status: 'pending',
        amount: 12000,
        paymentStatus: 'pending',
        location: 'Lagos, Nigeria',
        timeline: [
            { title: 'Request Sent', date: 'Today, 11:00', status: 'current' },
            { title: 'Provider Accepted', status: 'pending' },
        ]
    },
    // Entrepreneur View Mocks (Incoming)
    {
        id: '4',
        serviceId: 's4',
        providerId: 'me',
        providerName: 'Customer: John Doe',
        providerAvatar: 'https://picsum.photos/100/100?random=4',
        serviceTitle: 'Plumbing Repair - Kitchen',
        date: '2025-12-01',
        time: '09:00',
        status: 'pending',
        amount: 5000,
        paymentStatus: 'pending'
    }
];

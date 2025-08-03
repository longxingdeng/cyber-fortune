export async function onRequestPost(context) {
    const { request } = context;

    // 添加CORS头部
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    try {
        // 解析请求体
        const body = await request.json();
        const { targetUrl, method = 'POST', headers = {}, body: requestBody } = body;

        console.log('Proxy request:', { targetUrl, method, headers: Object.keys(headers), hasBody: !!requestBody });

        if (!targetUrl) {
            return new Response(JSON.stringify({ error: 'Missing targetUrl' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }

        // 转发请求到目标API
        const response = await fetch(targetUrl, {
            method: method,
            headers: headers,
            body: requestBody ? JSON.stringify(requestBody) : undefined
        });

        console.log('Target API response:', { status: response.status, statusText: response.statusText });
        
        // 处理流式响应
        if (requestBody && requestBody.stream === true) {
            console.log('Handling streaming response');

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    ...corsHeaders
                }
            });
        }
        
        // 处理普通响应
        console.log('Handling regular response');
        const responseData = await response.text();

        return new Response(responseData, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
                ...corsHeaders
            }
        });
        
    } catch (error) {
        console.error('Proxy error:', error);

        return new Response(JSON.stringify({
            error: 'Proxy request failed',
            message: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    }
}

// 处理预检请求
export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}
